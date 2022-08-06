import useFirestore from "../firebase/useFirestore";

const Scores = () => {
  const { isLoading, data: scores, fetchNext, isNext } = useFirestore("scores", true)

  if (isLoading) {
    return (
      <main className="scores">
        <h1>Loading ...</h1>
      </main>
    )
  }

  return (
    <main className="scores">
      <table>
        <caption>Scores</caption>
        <colgroup>
          <col span="1" />
          <col span="1" />
          <col span="1" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" rowSpan={2}>Rank</th>
            <th scope="col" rowSpan={2}>Player</th>
            <th scope="col" rowSpan={1}>Time</th>
          </tr>
          <tr>
            <th rowSpan={1}>(min : sec : milisec)</th>
          </tr>
        </thead>
        {
          scores &&
          <tbody>
            {
              scores.map(el => {
                const rank = scores.findIndex(item => item.id === el.id) + 1
                return (
                  <tr key={el.id}>
                    <td>{rank}</td>
                    <td>{el.name}</td>
                    <td>{el.time}</td>
                  </tr>)
              })
            }
          </tbody>
        }
        {
          !isNext &&
          <tfoot>
            <tr>
              <th colSpan={3}>
                No more data!
              </th>
            </tr>
          </tfoot>
        }
      </table>
      {
        isNext &&
        <div className="pagination">
          <button onClick={fetchNext}>Next</button>
        </div>
      }
    </main>
  );
}

export default Scores;