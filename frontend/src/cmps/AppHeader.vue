<template>
    <header class="app-header">
        <h1>Instagram</h1>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
    </header>
</template>

<script>
export default {}
</script>

<style>
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.app-header nav {
    display: flex;
    gap: 10px;
}
</style>
