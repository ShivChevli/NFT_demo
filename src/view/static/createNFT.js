document.addEventListener("DOMContentLoaded", async function () {

    if (App.web3Provider == undefined) {
        await App.load();
    }
    let loading_spinner = document.querySelector("#loading_spinner");
    let loading_text = document.querySelector("#loading_text");
    let submit_text = document.querySelector("#submit_text");

    let nft_title = document.querySelector("#nft_title");
    let account_address = document.querySelector("#account_address");
    if (App.account) {
        account_address.value = App.account;
    }
    let nft_description = document.querySelector("#nft_description");
    let resource = document.querySelector("#fileupload");

    async function uploadFiles() {

        let formData = new FormData();
        formData.append("nft_file", resource.files[0]);
        formData.append("discription", nft_description.value);
        formData.append("title", nft_title);
        const response = await fetch('/', {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        const result = await App.create_nft(data.ci);
        if (result != null) {
            // window.history.pushState("http://localhost:5000/register")
            window.location.replace("http://localhost:5000/");
            window.location.reload();
        }
    }

    document.querySelector("#create_nft_form").addEventListener("submit", function (event) {

        submit_text.style.display = "none";
        loading_spinner.style.display = "inline-block";
        loading_text.style.display = "inline-block";

        document.querySelector("#submitBtn").disabled = true;
        document.querySelector("#resetBtn").disabled = true;
        uploadFiles();
        console.log("From submitted");
        event.preventDefault();
    })


    // For Quick test

    // document.querySelector("#shortcut").addEventListener("click", async function (event) {
    //     let cid = document.querySelector("#cid").value;
    //     let data = await App.create_nft(cid);
    //     console.log("NFT created");
    //     console.log(data);
    // })

})