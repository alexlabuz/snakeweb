<template>
    <h1>Snake game</h1>

    <Board class="board" :game-board="snakeRef.gameBoard" :is-game-over="snakeRef.isGameOver" @on-swipe="onSwipe"></Board>

    <div class="game_info">
        <p v-if="!snakeRef.isStartGame && !snakeRef.isGameOver">Welcome ! Press a arrow key or swipe to start</p>
        <p v-else-if="snakeRef.isStartGame || snakeRef.isGameOver">Score : {{snakeRef.getScore()}}</p>

        <button v-if="!snakeRef.isStartGame && snakeRef.isGameOver" @click="snakeRef.resetGame()">Reset</button>
    </div>
</template>

<script setup lang="ts">
import {MoveDirection, Snake} from "@/models/snake.ts";
import {computed, ref} from "vue";
import Board from "@/components/board.vue";

const snake = new Snake();
const snakeRef = ref(snake);

const colorBorderBoard = computed(() => snakeRef.value.isGameOver ? "#ff7676" : "white");

const onSwipe = (direction: MoveDirection) => snakeRef.value.changeMoveDirection(direction);

window.addEventListener("keydown", (e) => {
    if(e.repeat) return;
    switch (e.code) {
        case "KeyW":
        case "ArrowUp":
            snakeRef.value.changeMoveDirection(MoveDirection.Top);
            break;
        case "KeyA":
        case "ArrowLeft":
            snakeRef.value.changeMoveDirection(MoveDirection.Left);
            break;
        case "KeyS":
        case "ArrowDown":
            snakeRef.value.changeMoveDirection(MoveDirection.Bottom);
            break;
        case "KeyD":
        case "ArrowRight":
            snakeRef.value.changeMoveDirection(MoveDirection.Right);
            break;
    }
});
</script>

<style scoped>
.board{
    border: 1px solid v-bind(colorBorderBoard);
    border-radius: 5px;
    width: 450px;
}

@media (max-width: 1080px) and (orientation: landscape)  {
    .board{
        width: 350px;
    }
}

@media (orientation: portrait) {
    .board{
        width: 85%;
    }
}

.game_info{
    margin-bottom: -2em;
    text-align: center;
    height: 90px;
}
</style>
