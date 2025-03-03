<script>
// @ts-nocheck
import "./app.css";
import {onMount} from 'svelte'
//import {getQuizData} from "./quizDataFactory";
import {getQuizDataAsync} from "./quizDataFactory";
import AnswerButton from "./AnswerButton.svelte";
import TitlePage from "./TitlePage.svelte";
import Progressbar from "./Progressbar.svelte";
import GameOverModal from "./GameOverModal.svelte";
import FancyScore from "./FancyScore.svelte";

const [InitialState, TitleState, QuestionState, AnswerState, GameoverState, QuizStart] = [0, 1, 2, 3, 4, 5];
const maxTime = 10;
let time = maxTime;
let currentScore = 0;
let renzokuSeikai = 0;
let quizdata;
let gameoverModal;
let fancyScore;

let state = InitialState;
onMount(changeToTitle);

function changeToTitle(){
  gameoverModal.closeModal();
  state = TitleState;
}
async function changeToQuestionAsync(){
  quizdata = await getQuizDataAsync();
  state = QuestionState;
}
function changeToAnswer(){
  state = AnswerState;
  setTimeout(()=>{
    if (state === AnswerState){
      changeToQuestionAsync();
    }
  }, 1000);
}
function changeToGameover(){
  state = GameoverState;
  gameoverModal.showModal(fancyScore.getScore());
}

function changeToQuizStart(){
  state = QuizStart;
  time = maxTime;
  const timer = setInterval(()=>{
    if (state === QuestionState && time < 0){
      clearInterval(timer);
      changeToGameover();
    }
    if (state === QuestionState) {
      time -= 0.1;
    }
  }, 100);
  changeToQuestionAsync();
}

function answerButtonClicked(isCorrect){
  if (state !== QuestionState) return;
  fancyScore.updateScore(isCorrect);
  if (fancyScore.getRenzokuSeikai() >= 5){
    time = Math.min(time + 1, maxTime);
  }
  else if (!isCorrect){
    time -= 1;
  }
  changeToAnswer();
}
</script>

{#if state === TitleState}
  <TitlePage on:click={changeToQuizStart()}></TitlePage>
{:else if state === QuestionState || state === AnswerState || state===GameoverState}
  <main class="flex flex-col h-svh">
    <FancyScore bind:this={fancyScore}/>
    <Progressbar {maxTime} {time}/>

    <div class="bg-green-200 text-center text-4xl py-4">{quizdata.mondai}</div>
    <div class="bg-blue-200 flex flex-col justify-around flex-grow items-center">
      {#each quizdata.taku as t}
        <AnswerButton 
          isGrayout={state === AnswerState && t !== quizdata.seikai}
          on:click={() => answerButtonClicked(t === quizdata.seikai)}>{t}
        </AnswerButton>
      {/each}
    </div>
  </main>    
{/if}


<GameOverModal bind:this={gameoverModal} on:click={changeToTitle}/>

<svelte:head>
  <title>QuizApp</title>
</svelte:head>