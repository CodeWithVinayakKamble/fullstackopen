import { useState } from "react"

const Header = ({ heading }) => {
  return (
    <h1>{heading}</h1>
  )
};

const Button = ({ onClickFn, btnText }) => {
  return (
    <button onClick={onClickFn}>{btnText}</button>
  )
};

const Subheader = ({ heading }) => {
  return (
    <h2>{heading}</h2>
  )
}

const Statistics = ({ label, ratingCount }) => {
  return (
    <p>{label} {ratingCount}</p>
  )
}

const App = () => {

  const [rating, setRating] = useState({ good: 0, neutral: 0, bad: 0 });

  console.log(`Rendering Ratings Values G : ${rating.good} | N : ${rating.neutral} | B : ${rating.bad}`);

  const goodCounter = () => {
    console.log(`Good Rating Before : ${rating.good}`)

    let updateGood = rating.good + 1;

    setRating({ ...rating, good: updateGood });
    console.log(`Good Rating After : ${updateGood}`)

  };

  const neutralCounter = () => {
    console.log(`Neutral Rating Before : ${rating.neutral}`)

    let updateNeutral = rating.neutral + 1;

    setRating({ ...rating, neutral: updateNeutral });
    console.log(`Neutral Rating After : ${updateNeutral}`)

  };

  const badCounter = () => {
    console.log(`Bad Rating Before : ${rating.bad}`)

    let updateBad = rating.bad + 1;

    setRating({ ...rating, bad: updateBad });
    console.log(`Bad Rating After : ${updateBad}`)
  };

  let totalFeedback = rating.good + rating.neutral + rating.bad;
  const averageScore = totalFeedback === 0 ? 0 : (rating.good - rating.bad) / totalFeedback;
  const positivePercentage = totalFeedback === 0 ? 0 : (rating.good / totalFeedback) * 100;

  return (
    <div>
      <Header heading="Give Feedback" />
      <Button onClickFn={goodCounter} btnText="Good" />
      <Button onClickFn={neutralCounter} btnText="Neutral" />
      <Button onClickFn={badCounter} btnText="Bad" />
      <Subheader heading="Statistics" />
      <Statistics label="Good" ratingCount={rating.good} />
      <Statistics label="Neutral" ratingCount={rating.neutral} />
      <Statistics label="Bad" ratingCount={rating.bad} />
      <Statistics label="All" ratingCount={totalFeedback} />
      <Statistics label="Average" ratingCount={averageScore} />
      <Statistics label="Positive" ratingCount={positivePercentage} />
    </div>
  )
};

export default App;