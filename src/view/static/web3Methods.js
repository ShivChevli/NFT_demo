App = {
    isMetamask: false,
    load: async () => {
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        console.log(App.account);

    },
    loadWeb3: async () => {
        console.log("This loadWeb 3");
        // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
        }
        if (ethereum.isMetaMask) {
            console.log("Wallet is Metamask");
            console.log("Current Network : - ", ethereum.networkVersion);
            console.log("Current Address : - ", ethereum.selectedAddress);
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            try {
                await connectMetaMask();

            } catch (error) {
                console.log("Error");
                console.error(error);
                // User denied account access...
                App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
                // window.web3 =  new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
                console.log("User has Denied to Access on this ");
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            // web3.eth.sendTransaction({/* ... */ })
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        // Set the current blockchain account
        if (App.isMetamask) {
            let t = await web3.eth.getAccounts()
            console.log(t);
            App.account = t[0]
        }
        else {
            App.account = "No Account Connected";
        }
    },

    loadContract: async () => {
        // Create a JavaScript version of the smart contract
        // const nft_demo1 = await $.getJSON('MyNFT.json')
        // console.log("Using Ajex");
        // console.log(nft_demo1);
        const response = await fetch('MyNFT.json')
        const nft_demo = await response.json()
        console.log("Using fetch");
        console.log(nft_demo);
        App.NFT_demo = new web3.eth.Contract(nft_demo.abi, "0x00cD1253Db755c355BA5595934cb454Cf6ca094F");
        App.NFT_demo.setProvider(App.web3Provider)

        // console.log(App.NFT_demo);
        // console.log(App.NFT_demo.methods);
    },

    loadNFT: async () => {
        if (App.isMetamask) {
            let tmp = await App.NFT_demo.methods.balanceOf(App.account).call()
            console.log(tmp);
            document.querySelector("#number-nft").innerHTML = tmp;
            let NFT_list = document.querySelector("#NFT-list");
            NFT_list.innerHTML = "";
            // tmp--;
            while (tmp > 0) {
                let uri = "https://ipfs.filebase.io/ipfs/" + await App.NFT_demo.methods.getTokenURIAddress(tmp).call()
                // console.log("Token URI");
                // console.log(uri);
                render_NFT(tmp, uri, App.account, NFT_list);
                tmp--;
            }
        }
    },
    loadAllNft: async () => {
        let total = await App.NFT_demo.methods.TOTAL_SUPPLY().call();
        let list = document.querySelector("#all-nft-list");
        list.innerHTML = "";
        total--;
        let count = 1;
        while (count < total) {
            try {
                let uri = "https://ipfs.filebase.io/ipfs/" + await App.NFT_demo.methods.getTokenURIAddress(count).call()
                // console.log("Token URI");
                // console.log(uri);
                let account = await App.NFT_demo.methods.ownerOf(count).call();
                // console.log("Nft Owner ");
                // console.log(account);
                render_NFT(count, uri, account, list);
                count++;
            }
            catch (error) {
                console.log("Total NFT is : ", count);
                break;
            }
        }
    },
    create_nft: async (cid) => {
        if (App.isMetamask) {
            // let uri = document.querySelector("#nft_uri").value;
            let uri = cid;
            console.log(App.account);
            let option = { from: App.account };
            const gase_price = await web3.eth.getGasPrice() * 0.08;
            let gase = await App.NFT_demo.methods.mintTo(App.account, uri).estimateGas(option);
            let data = await App.NFT_demo.methods.mintTo(App.account, uri).send({ ...option, gasLimit: gase });
            // console.log(data);
            // tmp = data;
            return data;
            // App.loadNFT();
            // App.loadAllNft();
        }
        else {
            alert("Connect to Metamask");
            connectMetaMask();
        }
        return null;
    },
    try: async () => {
        let data = await App.NFT_demo.methods.baseTokenURI().call();
        console.log("data");
        console.log(data);
    },
}

async function connectMetaMask() {
    console.log("Before Connecting");
    console.log(App.web3Provider);

    await ethereum.enable();
    App.isMetamask = true;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    App.account = account;
    let tmp = new Web3(window.ethereum);
    App.web3Provider = tmp.currentProvider;
    console.log(App.web3Provider);
    console.log("After Connecting");
    await App.loadAccount();
    // await App.loadNFT();
}
async function render_NFT(tokenId, uri, address, list) {

    let response = await fetch(uri);
    let data = await response.json();

    console.log("Metadeta");
    console.log(data);
    //     list.innerHTML += `
    //     <div class="card col-6 py-5">
    //         <img src="${data.Item_URL}" class="card-img-top rounded " alt="Art work at Token ${tokenId}">
    //         <div class="card-body">
    //             <table> 
    //                 <tr>
    //                     <td> NFT Id : </td>
    //                     <td> ${tokenId}</td>
    //                 </tr>
    //                 <tr>
    //                     <td> Owner Address : </td>
    //                     <td> ${address}</td>
    //                 </tr>
    //             </table>
    //         </div>
    //     </div>
    // `;
    list.innerHTML += `
        <div class="col-4 px-3 my-4">
                <div class="card">
                    <div class="card-img-top">
                        <img src="${data.Item_URL}" class="" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">NFT ${tokenId}</h5>
                        <p class="card-text">${data.discription}</p>
                        <span class="fw-bold"> ${address}</span>
                    </div>
                </div>
        </div>
    `;
}
async function connectBtnClick() {
    let connectBtn = document.querySelector("#connect");
    try {
        await ethereum.enable();
        App.isMetamask = true;
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        App.account = account;
        let tmp = new Web3(window.ethereum);
        App.web3Provider = tmp.currentProvider;
        console.log(App.web3Provider);
        console.log("After Connecting");
        await App.loadAccount();
        await App.loadNFT();
    }
    catch (error) {
        console.log("Meta Mask Connection Refuse")
    }
    connectBtn.classList.add("btn-success");
    connectBtn.classList.remove("btn-danger");
    connectBtn.disabled = true;
}