import { HistoryContainer, HistoryList, Status } from "./styles";


export  function History(){
    return(
        <HistoryContainer>
        <h1>History</h1>
        <HistoryList>
            <table>
                <thead>
                    <tr>
                        <th>Tarefas</th>
                        <th>Duração</th>
                        <th>Início</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tarefas</td>
                        <td>20 minutos</td>
                        <td>Há 2 meses</td>
                        <td><Status status_color="green">Concluidos</Status></td>
                    </tr>
                    <tr>
                        <td>Tarefas</td>
                        <td>20 minutos</td>
                        <td>Há 2 meses</td>
                        <td><Status status_color="red">Em andamento</Status></td>
                    </tr>
                </tbody>
            </table>
        </HistoryList>
        </HistoryContainer>
    )
}