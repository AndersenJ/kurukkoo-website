<template>
    <div class="about">
        <h1>About</h1>
        <div class="explanation">
            <h2>What is "Kurukkoo!"</h2>
            <p>Kurukkoo! is a Pokémon Red Version Nuzlocke comic written and drawn by KC Andersen.<p>
            <p>It is also the sound a pidgey makes.
            <h2>What is a "Nuzlocke"?</h2>
            <p>A Nuzlocke is a playthrough of a Pokémon game under a specific ruleset intended to increase the difficulty.</p>
            <p>These rules are as follows:</p>
            <ol>
                <li>The player may only capture the first Pokémon encountered on each route.</li>
                <li>If a Pokémon faints, it is considered dead and must be released.</li>
            </ol>
            <p>Given the dramatic nature of these playthroughs, it is common to share these stories of victory and loss through various mediums, frequently comics.
            <h2>Wait so your Pokémon die?</h2>
            <p>We'll have to wait and find out.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About',
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.explanation {
    width: 900px;
    margin: auto;
    text-align: left;
    border: solid 5px #505050;
    padding-left: 15px;
}

.explanation, .explanation * {
    background-color: #eeeeee;
}
</style>
