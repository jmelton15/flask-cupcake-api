$(document).ready(async function() {
    let $cupcakeList = $("#cupcake-list-container");
    let $createBtn = $("#create-cc");
    let $updateBtn = $("#update-cc");
    let $flavor = $("#flavor");
    let $size = $("#size");
    let $rating = $("#rating");
    let $ccImage = $("#image");
    let $editForm = $("#edit-cc-form");

    $editForm.toggleClass("hidden");

    let update_id = null;
    /**
     * We create a gloabl variable cupcakes that will eventually hold 
     *   an instance of the CupcakeList class for us so we don't have to 
     *    keep making get requests to the server to know what cupcakes we 
     *    can work with on the front-end. 
     */
    let cupcakes = null;

    // This calls the loadCupcakes() function to start the page
    await loadCupcakes();

    // A simple on-click handler for our cupcake create button
    $createBtn.on("click",createCupcake);

    $updateBtn.on("click",async function(e) {
        e.preventDefault();
        await editCupcake();
    });

    /**
     * This function is in charge of loading up all the cupcakes we have in the db
     *  so we can display them on the page.
     * The function calls the getCupcakes() method of Class CupcakeList and stores
     *  the instance in our cupcakes global variable like mentioned above.
     * The function also calls the createHTML function that will generate the 
     *  list element with the cupcake information
     * We add eventlisteners to each individual delete button as well
     */
    async function loadCupcakes() {
        let response = await CupcakeList.getCupcakes();
        cupcakes = response;
        console.log(cupcakes)
        $cupcakeList.empty();

        for (let cc of cupcakes.cupcakes) {
            console.log(cc)
            const html = createHTML(cc);
            $cupcakeList.append(html);
            let delBtn = document.getElementById(`del-btn-${cc.id}`);
            delBtn.addEventListener("click",deleteCupcake);
            let editBtn = document.getElementById(`edit-btn-${cc.id}`);
            editBtn.addEventListener("click",showEditForm);
        }
    }

    /**
     * This function does what its name implies, creates HTML for a given cupcake.
     *  It creates a list element,a button for deleting, and an image to hold the img
     *   of the cupcake
     */
    function createHTML(cupcake) {
        const cupcakeHTML = $(`
            <div class="card col-3 m-3 card-${cupcake.id}">
            <h1 class="text-center">${cupcake.flavor}</h1>
            <img src="${cupcake.image}" class="card-img-top" id="cupcake-image">
                <div class="card-body d-flex justify-content-center flex-column">
                    <h3>Size: <span class="h3-size ms-2">${cupcake.size}</span></h3>
                    <h3>Rating: <span class="h3-rating ms-2">${cupcake.rating}</span></h3>
                    <div class="d-flex flex-row">
                        <button class="btn btn-sm btn-success ms-2" id="edit-btn-${cupcake.id}" data-id="${cupcake.id}">Edit</button>
                        <button class="btn btn-sm btn-danger ms-2" id="del-btn-${cupcake.id}" data-id="${cupcake.id}">X</button>
                    </div>    
                </div>
            </div>
        `);
        return cupcakeHTML;
    }

    /**
     * this is a function we use for creating a cupcake. This createCupcake function
     *  calls the createCupcake method of the CupcakeList class and passes in the values
     *   from our form.
     * We then call the loadCupcakes function again to load the page with the newly created
     * cupcake
     */
    async function createCupcake() {
        let flavor = $flavor.val();
        let size = $size.val();
        let rating = $rating.val();
        let image = $ccImage.val();

        let newCupcake = {flavor,size,rating,image}
        await CupcakeList.createCupcake(newCupcake)
        await loadCupcakes();
    }

    /**
     * This function does what its name implies, deletes a given cupcake
     * It calls the deleteCupcake method of class CupcakeList and stores the 
     * updated CupcakeList object into the global cupcakes variable so we have an
     * updated front-end object list to work with without making another get request.
     */
    async function deleteCupcake() {
        let $id = $(this).data('id');
        let response = await CupcakeList.deleteCupcake($id,cupcakes);
        cupcakes = response;
        console.log(cupcakes)
        $(this).parent().parent().parent().remove();
    }

    function showEditForm() {
        $editForm.toggleClass("hidden");
        update_id = $(this).data("id");
        location.href = "#large-header";
    }

    async function editCupcake() {
        let u_flavor;
        let u_size;
        let u_rating;
        let u_image;
        if ($("#u_flavor").val() != '') {
            u_flavor = $("#u_flavor").val();
        }
        if ($("#u_size").val() != '') {
            u_size = $("#u_size").val();
        }
        if ($("#u_rating").val() != '') {
            u_rating = $("#u_rating").val();
        }
        if ($("#u_image").val() != '') {
            u_image = $("#u_image").val();
        }
        let cupcake = {
            flavor:u_flavor,
            size:u_size,
            rating:u_rating,
            image:u_image
        }
        console.log(cupcake)
        let updatedCC = await CupcakeList.updateCupcake(update_id,cupcake,cupcakes)
        $editForm.toggleClass("hidden");
        $(`.card-${update_id} h1`).text(`${updatedCC.flavor}`)
        $(`.card-${update_id} img`).attr('src',`${updatedCC.image}`)
        $(`.card-${update_id} .h3-size`).text(`${updatedCC.size}`)
        $(`.card-${update_id} .h3-rating`).text(`${updatedCC.rating}`)
        document.querySelector(`.card-${update_id}`).scrollIntoView();
    }
})