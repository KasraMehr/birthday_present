<template>
    <div
            @click="showMessage = !showMessage"
            class="p-6 bg-white rounded-xl shadow-md cursor-pointer transition-all hover:shadow-lg"
    >
        <div v-if="!showMessage" class="text-center">
            <div class="w-12 h-12 mx-auto mb-3 bg-pink-100 rounded-full flex items-center justify-center text-pink-500">
                <i class="fas fa-gift text-xl"></i>
            </div>
            <p class="text-gray-600">برای دیدن پیام کلیک کن!</p>
        </div>

        <div v-else class="text-center animate-pulse">
            <p class="text-xl text-pink-500 font-bold">تولدت مبارک عزیزم! ♥</p>
            <p class="text-gray-600 mt-2">تو بهترینی و همیشه باعث افتخار منی!</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showMessage: false
        }
    }
}
</script>