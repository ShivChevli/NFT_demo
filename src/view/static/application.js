
document.addEventListener("DOMContentLoaded", async () => {

    await App.load();
    setAccoutAddress();
    await App.loadNFT();
    await App.loadAllNft();
    connectBtnClick();

    // await App.try();

    // document.querySelector("#create_nft").addEventListener("submit", function(event){
    //     let tmp = App.create_nft();
    //     console.log(tmp);
    //     event.preventDefault();
    // })

    // let MyNft = document.querySelector("#myNft");
    // let AllNft = document.querySelector("#allNft");
    // document.querySelector("#allBtn").onclick = function () {

    //     document.querySelector("#myBtn").classList.add("btn-dark");
    //     document.querySelector("#myBtn").classList.remove("btn-primary");
    //     this.classList.remove("btn-dark");
    //     this.classList.add("btn-primary");
    //     MyNft.style.display = "none";
    //     AllNft.style.display = "block";
    // }
    // document.querySelector("#myBtn").onclick = function () {
    //     document.querySelector("#allBtn").classList.add("btn-dark");
    //     document.querySelector("#allBtn").classList.remove("btn-primary");
    //     this.classList.remove("btn-dark");
    //     this.classList.add("btn-primary");
    //     MyNft.style.display = "block";
    //     AllNft.style.display = "none";
    // }
    // MyNft.style.display = "none";

    function setAccoutAddress() {
        document.querySelector("#account-address").innerHTML = App.account;
        console.log("Account Loaded");
    }


})

var tmp;