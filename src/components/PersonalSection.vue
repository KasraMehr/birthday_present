<template>
    <div class="p-6 bg-white rounded-xl shadow-md mb-6">
        <div class="flex flex-col items-center">
            <div class="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl mb-4">
                {{ name.charAt(0) }}
            </div>
            <h1 class="text-3xl font-bold text-gray-800">{{ name }}</h1>
            <h2 class="text-xl text-pink-500 mb-4">{{ title }}</h2>

            <div class="w-full space-y-2">
                <div v-for="contact in contacts" :key="contact.type" class="flex items-center">
          <span class="w-8 text-center">
            <i :class="`${contact.icon} text-pink-400`"></i>
          </span>
                    <span class="text-gray-600">{{ contact.value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "نام دوست دخترت",
            title: "تخصص / موقعیت شغلی",
            contacts: [
                { type: "email", icon: "fas fa-envelope", value: "example@email.com" },
                { type: "phone", icon: "fas fa-phone", value: "۰۹۱۲•••••••" },
                { type: "github", icon: "fab fa-github", value: "github.com/username" }
            ]
        }
    }
}
</script>