import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td> {props.text}</td>
      <td> {props.value} </td>
    </tr>
  )

}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
const Statistics = (props) => {
  // {good, neutral, bad, all, positive, average} = props

  if (props.all > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive} />
        </tbody>
      </table>

    )
  }
  else {
    return <div>No feedback given</div>
  }

}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)



  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(good + 1)

    const updatedAll = all + 1
    setAll(updatedAll)

    const percentage = (updatedGood / updatedAll) * 100
    setPositive(percentage)

    const updatedAverage = (updatedGood + -1 * bad) / updatedAll
    setAverage(updatedAverage)

  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)

    const updatedAll = all + 1
    setAll(updatedAll)

    const percentage = (good / updatedAll) * 100
    setPositive(percentage)

    const updatedAverage = (good + -1 * bad) / updatedAll
    setAverage(updatedAverage)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)

    const updatedAll = all + 1
    setAll(updatedAll)

    const percentage = (good / updatedAll) * 100
    setPositive(percentage)

    const updatedAverage = (good + -1 * updatedBad) / updatedAll
    setAverage(updatedAverage)
  }





  return (
    <div>

      <h1>give feedback</h1>
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />


      <h1>statistics</h1>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />

    </div>
  )
}

export default App