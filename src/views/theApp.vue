
<template>
    <div class="bg-main">
        <navbar :apptitle = "apptitle" :conn = "connected"></navbar>
        <div id="main-container">
            <mainView  v-if = "view === 'Main'"></mainView>
            <blockInfo v-if = "view === 'Block'"></blockInfo>
            <txInfo    v-if = "view === 'Transaction'"></txInfo>
            <addrInfo  v-if = "view === 'Address'"></addrInfo>
            <blockTxs  v-if = "view === 'Transactions for Block'"></blockTxs>
        </div>
    </div>      
</template>

<script type="text/javascript" src="../scripts/app.js"/>