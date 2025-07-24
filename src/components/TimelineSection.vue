<template>
    <div class="p-6 bg-white rounded-xl shadow-md mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">سوابق</h2>

        <div class="space-y-4">
            <div v-for="(item, index) in items" :key="index" class="relative pl-6 border-r-2 border-pink-200">
                <div class="absolute -right-2 top-0 w-4 h-4 rounded-full bg-pink-400 border-2 border-white"></div>
                <div class="text-sm text-pink-500">{{ item.period }}</div>
                <h3 class="text-lg font-semibold">{{ item.title }}</h3>
                <p class="text-gray-600">{{ item.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    period: "۱۴۰۰-۱۴۰۲",
                    title: "شرکت نمونه",
                    description: "توضیحات درباره مسئولیت‌ها و دستاوردها"
                },
                {
                    period: "۱۳۹۸-۱۴۰۰",
                    title: "دانشگاه نمونه",
                    description: "رشته تحصیلی - مقطع"
                }
            ]
        }
    }
}
</script>