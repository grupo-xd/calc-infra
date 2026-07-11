import * as ExcelJS from 'exceljs';
import type { ProjectResult } from './ObjectInstantiation';

type SpreadsheetRow = {
    item: string;
    quantidade: number | string;
    unidade: string;
};

export class SpreadsheetConverter {
    private data: ProjectResult;

    public constructor(data: ProjectResult) {
        this.data = data;
    }

    private formatCableCategory(type: string): string {
        const normalized = type.toLowerCase();
        const match = normalized.match(/^cat(\d)(a)?$/);
        if (match) {
            return `cat.${match[1]}${match[2] ?? ''}`;
        }
        return normalized;
    }

    private formatColor(color: string): string {
        return color.toLowerCase();
    }

    private formatQuantity(value: number | string): number {
        if (typeof value === 'number') {
            return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
        }
        const numeric = Number(value);
        return Number.isFinite(numeric) ? Math.max(0, Math.round(numeric)) : 0;
    }

    private buildRows(rows: SpreadsheetRow[]): SpreadsheetRow[] {
        return rows
            .filter((row) => this.formatQuantity(row.quantidade) > 0)
            .map((row, index) => ({
                ...row,
                item: `${index + 1} - ${row.item}`,
                quantidade: this.formatQuantity(row.quantidade),
            }));
    }

    private addSection(worksheet: ExcelJS.Worksheet, title: string, rows: SpreadsheetRow[]) {
        const sectionTitleRow = worksheet.addRow({ item: title, quantidade: '', unidade: '' });
        sectionTitleRow.font = { bold: true, size: 12 };
        worksheet.addRow({ item: '', quantidade: '', unidade: '' });

        this.buildRows(rows).forEach((row) => {
            worksheet.addRow({
                item: row.item,
                quantidade: row.quantidade,
                unidade: row.unidade,
            });
        });

        worksheet.addRow({ item: '', quantidade: '', unidade: '' });
    }

    public async criarPlanilha() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Quantificação');

        worksheet.columns = [
            { header: 'Item', key: 'item', width: 44 },
            { header: 'Quantidade', key: 'quantidade', width: 16 },
            { header: 'Unidade', key: 'unidade', width: 16 },
        ];

        const titleCell = worksheet.getCell('A1');
        titleCell.value = 'QUANTIFICAÇÃO DE MATERIAL - INFRAESTRUTURA DE REDE';
        titleCell.font = { bold: true, size: 14 };
        worksheet.mergeCells('A1:C1');

        worksheet.addRow([]);
        const headerRow = worksheet.addRow({ item: 'Item', quantidade: 'Quantidade', unidade: 'Unidade' });
        headerRow.font = { bold: true };
        headerRow.eachCell((cell) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFEFEF' } };
        });
        worksheet.addRow([]);

        const floorCount = Math.max(1, this.data.floors.length);
        const summaryRows: SpreadsheetRow[] = [
            { item: 'Andares considerados', quantidade: floorCount, unidade: 'unidades' },
            { item: 'Pontos de dados', quantidade: this.data.totalNetworkPoints, unidade: 'pontos' },
            { item: 'Pontos de voz', quantidade: this.data.totalVoicePoints, unidade: 'pontos' },
            { item: 'Pontos de segurança', quantidade: this.data.totalSecurityPoints, unidade: 'pontos' },
            { item: 'Total de pontos', quantidade: this.data.totalNetworkPoints + this.data.totalVoicePoints + this.data.totalSecurityPoints, unidade: 'pontos' },
        ];
        this.addSection(worksheet, 'Dados da Solução', summaryRows);

        if (this.data.backboneInfo.numAndares > 0) {
            const backboneRows: SpreadsheetRow[] = [
                { item: 'Pares de fibra óptica', quantidade: this.data.backboneInfo.paresFibras, unidade: 'pares' },
                { item: 'Distância total de backbone', quantidade: this.data.backboneInfo.medidaBackbone * this.data.backboneInfo.numAndares, unidade: 'metros' },
                { item: 'Backbones por andar', quantidade: this.data.backboneInfo.backbonesPorAndar, unidade: 'unidades' },
                { item: 'Fibra óptica tipo', quantidade: String(this.data.backboneInfo.tipoFibra), unidade: '' },
                { item: 'Categoria de fibra', quantidade: String(this.data.selectedFiberCategory.type), unidade: '' },
            ];
            this.addSection(worksheet, 'Backbone', backboneRows);
        }

        if (this.data.horizontalMeshInfo.numAndares > 0) {
            const cableBoxes = Math.max(1, Math.ceil((this.data.horizontalMeshInfo.medidaMH * Math.max(this.data.totalNetworkPoints + this.data.totalVoicePoints + this.data.totalSecurityPoints, 1)) / 305));
            const horizontalRows: SpreadsheetRow[] = [
                { item: `Cabo UTP par trançado ${this.formatCableCategory(String(this.data.selectedCableCategory.type))} (MH)`, quantidade: cableBoxes, unidade: 'caixas' },
                { item: 'Pontos por pavimento', quantidade: this.data.horizontalMeshInfo.pontosPorPavimento, unidade: 'pontos' },
                { item: 'Medida base MH', quantidade: this.data.horizontalMeshInfo.medidaMH, unidade: 'metros' },
                { item: 'Número de pavimentos', quantidade: this.data.horizontalMeshInfo.numAndares, unidade: 'unidades' },
            ];
            this.addSection(worksheet, 'Malha Horizontal', horizontalRows);
        }

        if (this.data.floors.length > 0) {
            const representativeFloor = this.data.floors[0];
            const workArea = representativeFloor.getWorkArea();
            const equipRoom = representativeFloor.getEquipamentRoom() as any;

            if (workArea.getPatchCords().length > 0) {
                const patchCordRows: SpreadsheetRow[] = workArea.getPatchCords().map((pc) => ({
                    item: `Patch Cord ${this.formatColor(pc.color)} - ${pc.defaultSize.toFixed(1).replace(/\.0$/, '')}m`,
                    quantidade: pc.quantity,
                    unidade: 'unidades',
                }));
                patchCordRows.push({ item: `Tomada RJ45 fêmea ${this.formatCableCategory(String(this.data.selectedCableCategory.type))}`, quantidade: workArea.getFacePlates(), unidade: 'unidades' });
                patchCordRows.push({ item: 'Etiquetas de identificação', quantidade: workArea.getTags(), unidade: 'unidades' });
                this.addSection(worksheet, 'Patch Cords', patchCordRows);
            }

            const equipmentRows: SpreadsheetRow[] = [
                { item: 'Patch Panel 24 portas (1U)', quantidade: equipRoom.getPatchPanel(), unidade: 'unidades' },
                { item: 'Etiquetas para Patch Panel', quantidade: equipRoom.getPatchPanelTag(), unidade: 'unidades' },
                { item: 'Etiquetas para portas do Patch Panel', quantidade: equipRoom.getPatchPanelPortTag(), unidade: 'unidades' },
                { item: 'Etiquetas para Patch Cable', quantidade: equipRoom.getPatchCableTag(), unidade: 'unidades' },
            ];
            this.addSection(worksheet, 'Equipamentos', equipmentRows);

            if (equipRoom.getPatchCable && equipRoom.getPatchCable().length > 0) {
                const patchCableRows: SpreadsheetRow[] = equipRoom.getPatchCable().map((pc: any) => ({
                    item: `Patch Cable ${this.formatCableCategory(pc.cableCategory.type)}, ${this.formatColor(pc.color)} - ${pc.defaultSize.toFixed(1).replace(/\.0$/, '')}m`,
                    quantidade: pc.quantity,
                    unidade: 'unidades',
                }));
                this.addSection(worksheet, 'Patch Cables', patchCableRows);
            }

            const fiberRows: SpreadsheetRow[] = [];
            if (equipRoom.getDio && equipRoom.getDio() > 0) {
                fiberRows.push({ item: 'DIO para distribuição de fibra', quantidade: equipRoom.getDio(), unidade: 'unidades' });
            }
            if (equipRoom.getTo && equipRoom.getTo() > 0) {
                fiberRows.push({ item: 'Terminal óptico', quantidade: equipRoom.getTo(), unidade: 'unidades' });
            }
            if (equipRoom.getPigtail) {
                fiberRows.push({
                    item: `Pigtail ${this.formatColor(equipRoom.getPigtail().color)} - ${equipRoom.getPigtail().size}m`,
                    quantidade: equipRoom.getPigtail().quantity,
                    unidade: 'unidades',
                });
            }
            if (equipRoom.getConectors) {
                fiberRows.push({ item: 'Conectores LC', quantidade: equipRoom.getConectors().lc, unidade: 'unidades' });
                fiberRows.push({ item: 'Conectores SC', quantidade: equipRoom.getConectors().sc, unidade: 'unidades' });
            }
            if (fiberRows.length > 0) {
                this.addSection(worksheet, 'Fibra Óptica', fiberRows);
            }

            const rackSize = (() => {
                const rack = equipRoom.getRack();
                return Array.isArray(rack) ? rack[0]?.size : rack?.size;
            })() ?? 0;
            const rackQuantity = rackSize > 0 ? Math.max(1, Math.ceil(rackSize / 48)) : 0;

            const rackRows: SpreadsheetRow[] = [
                { item: `Rack 19" x ${rackSize}U`, quantidade: rackQuantity, unidade: 'unidade' },
                { item: 'Porca Gaiola', quantidade: equipRoom.getCageNut(), unidade: 'unidades' },
                { item: 'Barra de Fechamento (1U)', quantidade: equipRoom.getCloseBar(), unidade: 'unidades' },
                { item: 'Régua de tomadas (8 tomadas)', quantidade: equipRoom.getPowerStrip(), unidade: 'unidades' },
                { item: 'Organizador frontal de cabos (1U)', quantidade: equipRoom.getFrontCableOrganizer(), unidade: 'unidades' },
                { item: 'Abraçadeiras de Velcro para cabos', quantidade: equipRoom.getVelcroCableTie(), unidade: 'unidades' },
                { item: 'Abraçadeiras plásticas', quantidade: equipRoom.getPlasticCableTie(), unidade: 'unidades' },
                { item: 'Exaustor 19"', quantidade: equipRoom.getExhauster(), unidade: 'unidades' },
            ];
            this.addSection(worksheet, 'Infraestrutura de Rack', rackRows);
        }

        try {
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `quantificacao_infraestrutura_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erro ao criar arquivo Excel:', error);
            throw error;
        }
    }
}