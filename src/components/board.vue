<template>
    <div class="board" @pointerdown="onPointerDown" @pointerup="onPointerUp" @pointermove="onPointerMove">
        <div v-for="column in gameBoard" class="column">
            <div v-for="box in column" class="box" :class="{
                snake_box: box === 1 && !isGameOver,
                game_over_box: box === 1 && isGameOver,
                square_box: box === 2
            }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {MoveDirection} from "@/models/snake.ts";

defineProps({
    gameBoard: Object as () => number[][],
    isGameOver: Boolean
});

const emit = defineEmits(['onSwipe'])

let clientX = 0;
let clientY = 0;
let isMove = false;

function onPointerDown(e: PointerEvent) {
    clientX = e.clientX;
    clientY = e.clientY;
    isMove = true;
}

function onPointerUp() {
    isMove = false;
}

function onPointerMove(e: PointerEvent) {
    if(!isMove) return;
    const diffX = e.clientX - clientX!;
    const diffY = e.clientY - clientY!;
    const precision = 20;

    if(Math.abs(diffX) > precision) {
        emit("onSwipe", diffX < 0 ? MoveDirection.Left : MoveDirection.Right);
        isMove = false;
    }
    if(Math.abs(diffY) > precision) {
        emit("onSwipe", diffY < 0 ? MoveDirection.Top : MoveDirection.Bottom);
        isMove = false;
    }
}

</script>

<style scoped>
.board{
    user-select: none;
    touch-action: none;
}

.board .column{
    display: flex;
}

.board .box{
    width: 100%;
    aspect-ratio: 1 / 1;
}

.board .snake_box{
    background-color: #b8d2fa;
}

.board .square_box{
    background-color: #caffa8;
    border-radius: 1em;
}

.board .game_over_box{
    background-color: #ff7676;
}
</style>