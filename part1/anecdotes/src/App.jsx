import { useState } from 'react'

const Header = ({ heading }) => {
  return (
    <h1>{heading}</h1>
  )
};

const SubHeader = ({ subHeading }) => {
  return (
    <h2>{subHeading}</h2>
  )
}

const Display = ({ anecdotes, position }) => {
  return (
    <p>{anecdotes[position]}</p>
  )
};

const Button = ({ onClickFn, btnText }) => {
  return (
    <button onClick={onClickFn}>{btnText}</button>
  )
};

const Vote = ({ voteCount }) => {
  return (
    <p>has {voteCount} votes</p>
  )
};

const HasMostVote = ({ anecdote, voteCount }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {voteCount} votes</p>
    </div>
  )
}

const App = () => {


  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomAncedotes = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random)
  };

  const voteCounter = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  // This code find Max vote Number from the votes Array
  const maxVote = Math.max(...votes);
  // This Shows Index of the most voted position
  const winningAncedote = votes.indexOf(maxVote);

  console.log(`Ancedote : ${anecdotes[selected]} | Position : ${selected} | Vote : ${votes[selected]}`)

  return (
    <div>
      <Header heading="Ancedote of the day" />
      <Display anecdotes={anecdotes} position={selected} />
      <Vote voteCount={votes[selected]} />

      <Button onClickFn={voteCounter} btnText="Vote" />
      <Button onClickFn={randomAncedotes} btnText="Next Ancedote" />
      <SubHeader subHeading="Ancedote with most votes" />
      <HasMostVote anecdote={anecdotes[winningAncedote]} voteCount={maxVote} />
    </div>
  )
}

export default App