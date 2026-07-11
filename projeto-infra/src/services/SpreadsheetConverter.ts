import * as ExcelJS from 'exceljs';
import type { ProjectResult } from './ObjectInstantiation';

export class SpreadsheetConverter {
    private data: ProjectResult;

    public constructor(data: ProjectResult) {
        this.data = data;
    }

    public async criarPlanilha() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Quantificação");

        // Configurar colunas
        worksheet.columns = [
            { header: "Item", key: "item", width: 40 },
            { header: "Quantidade", key: "quantidade", width: 15 },
            { header: "Unidade", key: "unidade", width: 15 },
        ];

        let rowNum = 1;

        // Título
        worksheet.mergeCells(`A${rowNum}:C${rowNum}`);
        const titleCell = worksheet.getCell(`A${rowNum}`);
        titleCell.value = "QUANTIFICAÇÃO DE MATERIAL - INFRAESTRUTURA DE REDE";
        titleCell.font = { bold: true, size: 14 };
        rowNum++;
        rowNum++;

        // Backbone
        if (this.data.backboneInfo.numAndares > 0) {
            worksheet.getCell(`A${rowNum}`).value = "BACKBONE";
            worksheet.getCell(`A${rowNum}`).font = { bold: true };
            rowNum++;
            
            worksheet.addRow({ item: "Pares de Fibra Óptica", quantidade: this.data.backboneInfo.paresFibras, unidade: "pares" });
            worksheet.addRow({ item: "Categoria de Fibra", quantidade: this.data.selectedFiberCategory.type, unidade: "" });
            worksheet.addRow({ item: "Distância Total", quantidade: this.data.backboneInfo.medidaBackbone * this.data.backboneInfo.numAndares, unidade: "m" });
            worksheet.addRow({ item: "Backbones por Andar", quantidade: this.data.backboneInfo.backbonesPorAndar, unidade: "un" });
            rowNum += 4;

            worksheet.addRow({});
            rowNum++;
        }

        // Malha Horizontal
        if (this.data.horizontalMeshInfo.numAndares > 0) {
            worksheet.getCell(`A${rowNum}`).value = "MALHA HORIZONTAL";
            worksheet.getCell(`A${rowNum}`).font = { bold: true };
            rowNum++;
            
            worksheet.addRow({ item: "Categoria de Cabo", quantidade: this.data.selectedCableCategory.type, unidade: "" });
            worksheet.addRow({ item: "Pontos de Dados", quantidade: this.data.totalNetworkPoints, unidade: "pontos" });
            worksheet.addRow({ item: "Pontos de Voz", quantidade: this.data.totalVoicePoints, unidade: "pontos" });
            worksheet.addRow({ item: "Pontos de Segurança", quantidade: this.data.totalSecurityPoints, unidade: "pontos" });
            rowNum += 4;

            // Patch Cords
            const workArea = this.data.floors[0]?.getWorkArea();
            if (workArea && workArea.getPatchCords().length > 0) {
                worksheet.getCell(`A${rowNum}`).value = "Patch Cords";
                worksheet.getCell(`A${rowNum}`).font = { bold: true };
                rowNum++;
                
                workArea.getPatchCords().forEach((pc) => {
                    worksheet.addRow({
                        item: `Patch Cord ${pc.color}`,
                        quantidade: pc.quantity,
                        unidade: "un."
                    });
                    rowNum++;
                });

                worksheet.addRow({ item: "Face Plates", quantidade: workArea.getFacePlates(), unidade: "un." });
                worksheet.addRow({ item: "Tags", quantidade: workArea.getTags(), unidade: "un." });
                rowNum += 2;

                worksheet.addRow({});
                rowNum++;
            }
        }

        // Equipamentos
        if (this.data.floors.length > 0) {
            const equipRoom = this.data.floors[0].getEquipamentRoom() as any;
            
            worksheet.getCell(`A${rowNum}`).value = "EQUIPAMENTOS";
            worksheet.getCell(`A${rowNum}`).font = { bold: true };
            rowNum++;

            // Patch Panels
            worksheet.addRow({ item: "Patch Panels", quantidade: equipRoom.getPatchPanel(), unidade: "un." });
            worksheet.addRow({ item: "Patch Panel Tags", quantidade: equipRoom.getPatchPanelTag(), unidade: "un." });
            worksheet.addRow({ item: "Patch Panel Port Tags", quantidade: equipRoom.getPatchPanelPortTag(), unidade: "un." });
            rowNum += 3;

            // Patch Cables
            if (equipRoom.getPatchCable && equipRoom.getPatchCable().length > 0) {
                worksheet.getCell(`A${rowNum}`).value = "Patch Cables";
                worksheet.getCell(`A${rowNum}`).font = { bold: true };
                rowNum++;
                
                equipRoom.getPatchCable().forEach((pc: any) => {
                    worksheet.addRow({
                        item: `Patch Cable ${pc.color}`,
                        quantidade: pc.quantity,
                        unidade: "un."
                    });
                    rowNum++;
                });

                worksheet.addRow({ item: "Patch Cable Tags", quantidade: equipRoom.getPatchCableTag(), unidade: "un." });
                rowNum += 1;

                worksheet.addRow({});
                rowNum++;
            }

            // Fibra Óptica
            if (equipRoom.getDio && equipRoom.getDio() > 0 || (equipRoom.getTo && equipRoom.getTo() > 0)) {
                worksheet.getCell(`A${rowNum}`).value = "FIBRA ÓPTICA";
                worksheet.getCell(`A${rowNum}`).font = { bold: true };
                rowNum++;

                worksheet.addRow({ item: "DIO", quantidade: equipRoom.getDio(), unidade: "un." });
                worksheet.addRow({ item: "Terminal Óptico", quantidade: equipRoom.getTo(), unidade: "un." });
                
                if (equipRoom.getPigtail) {
                    worksheet.addRow({
                        item: `Pigtails (${equipRoom.getPigtail().color})`,
                        quantidade: equipRoom.getPigtail().quantity,
                        unidade: "un."
                    });
                }
                
                if (equipRoom.getConectors) {
                    worksheet.addRow({ item: "Conectores LC", quantidade: equipRoom.getConectors().lc, unidade: "un." });
                    worksheet.addRow({ item: "Conectores SC", quantidade: equipRoom.getConectors().sc, unidade: "un." });
                }
                
                rowNum += 4;
                worksheet.addRow({});
                rowNum++;
            }

            // Infraestrutura de Rack
            worksheet.getCell(`A${rowNum}`).value = "INFRAESTRUTURA";
            worksheet.getCell(`A${rowNum}`).font = { bold: true };
            rowNum++;

            const rackSize = (() => {
                const rack = equipRoom.getRack();
                return Array.isArray(rack) ? rack[0]?.size : rack?.size;
            })();

            worksheet.addRow({ item: "Rack", quantidade: rackSize, unidade: "U" });
            worksheet.addRow({ item: "Cage Nuts", quantidade: equipRoom.getCageNut(), unidade: "un." });
            worksheet.addRow({ item: "Close Bar", quantidade: equipRoom.getCloseBar(), unidade: "un." });
            worksheet.addRow({ item: "Power Strip", quantidade: equipRoom.getPowerStrip(), unidade: "un." });
            worksheet.addRow({ item: "Front Cable Organizer", quantidade: equipRoom.getFrontCableOrganizer(), unidade: "un." });
            worksheet.addRow({ item: "Velcro Cable Tie", quantidade: equipRoom.getVelcroCableTie(), unidade: "un." });
            worksheet.addRow({ item: "Plastic Cable Tie", quantidade: equipRoom.getPlasticCableTie(), unidade: "un." });
            worksheet.addRow({ item: "Exhauster", quantidade: equipRoom.getExhauster(), unidade: "un." });
        }

        // Salvar arquivo no navegador
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
            console.error("Erro ao criar arquivo Excel:", error);
            throw error;
        }
    }
}