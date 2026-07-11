import type { ProjectResult } from "../services/ObjectInstantiation";
import { SpreadsheetConverter } from "../services/SpreadsheetConverter";

export default function ResultsComponent({ data }: { data: ProjectResult }) {
    const handleExportExcel = async () => {
        try {
            const converter = new SpreadsheetConverter(data);
            await converter.criarPlanilha();
        } catch (error) {
            console.error("Erro ao exportar:", error);
            alert("Erro ao exportar para Excel");
        }
    };

    const getEquipamentRoom = () => data.floors.length > 0 ? (data.floors[0].getEquipamentRoom() as any) : null;
    const getWorkArea = () => data.floors.length > 0 ? data.floors[0].getWorkArea() : null;

    const equipRoom = getEquipamentRoom();
    const workArea = getWorkArea();

    return (
        <div className="results-container">
            <h2>Resultados da Quantificação</h2>

            <section className="results-summary">
                {(data.backboneInfo.numAndares > 0) && (
                    <div className="result-group">
                        <h4>Backbone</h4>
                        <p><strong>Andares:</strong> {data.backboneInfo.numAndares}</p>
                        <p><strong>Pares de Fibras:</strong> {data.backboneInfo.paresFibras}</p>
                        <p><strong>Medida Base:</strong> {data.backboneInfo.medidaBackbone}m</p>
                        <p><strong>Backbones por Andar:</strong> {data.backboneInfo.backbonesPorAndar}</p>
                        <p><strong>Distância Total:</strong> {data.backboneInfo.medidaBackbone * data.backboneInfo.numAndares}m</p>
                        <p><strong>Tipo de Fibra:</strong> {data.backboneInfo.tipoFibra}</p>
                        <p><strong>Categoria de Fibra:</strong> {data.selectedFiberCategory.type}</p>
                        <p><strong>Velocidade Máxima:</strong> {data.selectedFiberCategory.maxSpeedGbps}Gbps</p>
                        <p><strong>Distância Máxima:</strong> {data.selectedFiberCategory.maxDistance}m</p>
                    </div>
                )}

                {(data.horizontalMeshInfo.numAndares > 0) && (
                    <div className="result-group">
                        <h4>Malha Horizontal</h4>
                        <p><strong>Andares:</strong> {data.horizontalMeshInfo.numAndares}</p>
                        <p><strong>Pontos por Pavimento:</strong> {data.horizontalMeshInfo.pontosPorPavimento}</p>
                        <p><strong>Medida Base:</strong> {data.horizontalMeshInfo.medidaMH}m</p>
                        <p><strong>Total de Pontos:</strong> {data.totalNetworkPoints + data.totalSecurityPoints + data.totalVoicePoints}</p>
                        <p><strong>Categoria de Cabo:</strong> {data.selectedCableCategory.type}</p>
                        <p><strong>Velocidade Máxima:</strong> {data.selectedCableCategory.maxSpeedGbps}Gbps</p>
                        <p><strong>Distância Máxima:</strong> {data.selectedCableCategory.maxDistance}m</p>
                    </div>
                )}

                <div className="result-group">
                    <h4>Pontos de Telecomunicação</h4>
                    <p><strong>Dados:</strong> {data.totalNetworkPoints}</p>
                    <p><strong>Voz:</strong> {data.totalVoicePoints}</p>
                    <p><strong>Segurança:</strong> {data.totalSecurityPoints}</p>
                    <p><strong>Total:</strong> {data.totalNetworkPoints + data.totalVoicePoints + data.totalSecurityPoints}</p>
                </div>

                {workArea && workArea.getPatchCords().length > 0 && (
                    <div className="result-group">
                        <h4>Patch Cords (Área de Trabalho)</h4>
                        {workArea.getPatchCords().map((pc, idx) => (
                            <p key={idx}>
                                <strong>{pc.color}:</strong> {pc.quantity} un. | Tamanho: {pc.defaultSize}m | Categoria: {pc.cableCategory.type}
                            </p>
                        ))}
                        <p><strong>Face Plates:</strong> {workArea.getFacePlates()}</p>
                        <p><strong>Tags:</strong> {workArea.getTags()}</p>
                    </div>
                )}

                {equipRoom && (
                    <div className="result-group">
                        <h4>Equipamentos - Patch Panels</h4>
                        <p><strong>Patch Panels:</strong> {equipRoom.getPatchPanel()} un.</p>
                        <p><strong>Patch Panel Tags:</strong> {equipRoom.getPatchPanelTag()} un.</p>
                        <p><strong>Patch Panel Port Tags:</strong> {equipRoom.getPatchPanelPortTag()} un.</p>
                    </div>
                )}

                {equipRoom && equipRoom.getPatchCable && equipRoom.getPatchCable().length > 0 && (
                    <div className="result-group">
                        <h4>Patch Cables</h4>
                        {equipRoom.getPatchCable().map((pc: any, idx: number) => (
                            <p key={idx}>
                                <strong>{pc.color}:</strong> {pc.quantity} un. | Tamanho: {pc.defaultSize}m | Categoria: {pc.cableCategory.type}
                            </p>
                        ))}
                        <p><strong>Patch Cable Tags:</strong> {equipRoom.getPatchCableTag()} un.</p>
                    </div>
                )}

                {equipRoom && (
                    <div className="result-group">
                        <h4>Fibra Óptica</h4>
                        <p><strong>DIO (Distribuição de Fibra):</strong> {equipRoom.getDio()} un.</p>
                        <p><strong>TO (Terminal Óptico):</strong> {equipRoom.getTo()} un.</p>
                        {equipRoom.getPigtail && (
                            <>
                                <p><strong>Pigtails:</strong> {equipRoom.getPigtail().quantity} un.</p>
                                <p><strong>  - Cor:</strong> {equipRoom.getPigtail().color}</p>
                                <p><strong>  - Tamanho:</strong> {equipRoom.getPigtail().size}m</p>
                            </>
                        )}
                        {equipRoom.getConectors && (
                            <>
                                <p><strong>Conectores LC:</strong> {equipRoom.getConectors().lc} un.</p>
                                <p><strong>Conectores SC:</strong> {equipRoom.getConectors().sc} un.</p>
                            </>
                        )}
                    </div>
                )}

                {equipRoom && (
                    <div className="result-group">
                        <h4>Infraestrutura de Rack</h4>
                        <p><strong>Tamanho do Rack:</strong> {(() => {
                            const rack = equipRoom.getRack();
                            return Array.isArray(rack) ? rack[0]?.size : rack?.size;
                        })()}U</p>
                        <p><strong>Cage Nuts:</strong> {equipRoom.getCageNut()} un.</p>
                        <p><strong>Close Bar:</strong> {equipRoom.getCloseBar()} un.</p>
                        <p><strong>Power Strip:</strong> {equipRoom.getPowerStrip()} un.</p>
                        <p><strong>Front Cable Organizer:</strong> {equipRoom.getFrontCableOrganizer()} un.</p>
                        <p><strong>Velcro Cable Tie:</strong> {equipRoom.getVelcroCableTie()} un.</p>
                        <p><strong>Plastic Cable Tie:</strong> {equipRoom.getPlasticCableTie()} un.</p>
                        <p><strong>Exhauster:</strong> {equipRoom.getExhauster()} un.</p>
                    </div>
                )}
            </section>

            <div className="actions">
                <button onClick={handleExportExcel} className="btn-export">
                    Exportar para Excel
                </button>
            </div>
        </div>
    );
}
