<template>
    <div class="p-6 bg-white rounded-xl shadow-md mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">مهارت‌ها</h2>

        <div class="space-y-3">
            <div v-for="skill in skills" :key="skill.name" class="skill-item">
                <div class="flex justify-between mb-1">
                    <span class="font-medium">{{ skill.name }}</span>
                    <span class="text-sm text-gray-500">{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                            class="h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"
                            :style="{ width: `${skill.level}%` }">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            skills: [
                { name: "طراحی UI/UX", level: 85 },
                { name: "توسعه Frontend", level: 75 },
                { name: "مدیریت پروژه", level: 90 }
            ]
        }
    }
}
</script>