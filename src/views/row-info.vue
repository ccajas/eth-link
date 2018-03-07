
<template>
    <div class="col-sm-4 fade-in" id="right-info-popup">
        <h2  class="fade-in">{{ message }} {{ itemNumber }}</h2>
        <ul>
            <li v-for="(value, name) in itemInfo" class="list-group-item">
                <b>{{name}}:</b>			
                <p>
                    <span v-if="isAddr(value)" is="addr-link" :addr = "value"></span>
                    <span v-else>{{ Array.isArray(value) ? value.length +' total' : value }}</span>
                </p>			
            </li>
        </ul>
        <div v-if="view === 'Block_'">
            <h3>Transactions</h3>
            <ul id="transaction-list">
                <li class="list-group-item" is="tx-link" 
                    v-for="tx in itemInfo.transactions" 
                    :tx = "tx" 
                    :key="tx.hash">
                </li>
            </ul>
        </div>
    </div>
</template>

<script src="../scripts/row-info.js"/>