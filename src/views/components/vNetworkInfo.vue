
<template>
    <section>
        <h4>Network Stats</h4>
        <ul>
            <li><h5>Difficulty</h5> {{ nf.format(difficulty) }}</li>
            <li><h5>Avg. block time</h5> {{ nf.format(blockTime) }} sec.</li>
            <li><h5>Hash rate</h5> {{ nf.format(hashRate) }} h/s</li>
        </ul>
    </section>
</template>

<script src="../../scripts/networkInfo.js"/>
