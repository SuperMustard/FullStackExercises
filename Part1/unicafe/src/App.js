import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine  = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

const StatisticTable = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistic = (props) => {
  const allCount = props.good + props.neutral + props.bad
  const average = (props.good - props.bad)/allCount
  const positive = props.good/allCount

  if (allCount == 0) {
    return (
      <div>
        <h3> No Feedback Given </h3>
      </div>
    )
  } else {
    return (
      <div>
        {/* <StatisticLine text='good' value = {props.good}/>
        <StatisticLine text='neutral' value = {props.neutral}/>
        <StatisticLine text='bad' value = {props.bad}/>
        <StatisticLine text='all' value = {allCount}/>
        <StatisticLine text='average' value = {average}/>
        <StatisticLine text='positive' value = {positive}/> */}
        <table>
          <StatisticTable text='good' value={props.good}/>
          <StatisticTable text='neutral' value = {props.neutral}/>
          <StatisticTable text='bad' value = {props.bad}/>
          <StatisticTable text='all' value = {allCount}/>
          <StatisticTable text='average' value = {average}/>
          <StatisticTable text='positive' value = {positive}/>
        </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedBack = () => setGood(good + 1)
  const neutralFeedBack = () => setNeutral(neutral + 1)
  const badFeedBack = () => setBad(bad + 1)

  return (
    <div>
      <h1> give feedback </h1>
      <Button  
        handleClick = {goodFeedBack}
        text='good'
      />
      <Button  
        handleClick = {neutralFeedBack}
        text='neutral'
      />
      <Button  
        handleClick = {badFeedBack}
        text='bad'
      />
      <h1> statistics </h1>
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App