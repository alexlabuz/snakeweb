<template>
    <h1>Snake game</h1>

    <div class="board">
        <div v-for="column in snakeRef.gameBoard" class="column">
            <div v-for="box in column" class="box" :class="{
                snake_box: box === 1 && !snakeRef.isGameOver,
                game_over_box: box === 1 && snakeRef.isGameOver,
                square_box: box === 2
            }"></div>
        </div>
    </div>

    <div class="game_info">
        <p v-if="!snakeRef.isStartGame && !snakeRef.isGameOver">Welcome ! Press a arrow key to start</p>
        <p v-else-if="snakeRef.isStartGame || snakeRef.isGameOver">Score : {{snakeRef.getScore()}}</p>

        <button v-if="!snakeRef.isStartGame && snakeRef.isGameOver" @click="snakeRef.resetGame()">Reset</button>
    </div>
</template>

<script setup lang="ts">
import {MoveDirection, Snake} from "@/models/snake.ts";
import {ref} from "vue";

const snake = new Snake();
const snakeRef = ref(snake);

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


.board .column{
    display: flex;
}

.board .box{
    width: 20px;
    height: 20px;
    border: 1px solid gray;
}

.board .snake_box{
    background-color: #b8d2fa;
}

.board .square_box{
    background-color: #caffa8;
    border-radius: 15px;
}

.board .game_over_box{
    background-color: #ff7676;
}

.game_info{
    margin-bottom: -2em;
    text-align: center;
    height: 90px;
}
</style>
