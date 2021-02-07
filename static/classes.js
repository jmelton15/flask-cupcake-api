// We know our base URL for the API, so this gives us flexibility and saves time
const BASE_URL = "http://127.0.0.1:5000/api";

/**
 * This class handles the majority of cupcake stuff.
 * From getting the cupcakes from the server/db
 * To adding a new cupcake to the db through a post request
 * To deleting a cupcake from the db
 * Each time making sure we are keeping our front-end class instances updated as well
 */
class CupcakeList {
    constructor(cupcakes) {
        this.cupcakes = cupcakes;
    }

    static async getCupcakes() {
        const response = await axios.get(`${BASE_URL}/cupcakes`);
        console.log(response)
        const cupcakes = response.data.cupcakes.map(cupcake => new Cupcake(cupcake));
        const cupcakeList = new CupcakeList(cupcakes);
        return cupcakeList; 
    }
    static async createCupcake(newCupcake) {
        const response = await axios.post(`${BASE_URL}/cupcakes`, {
            flavor: newCupcake.flavor,
            size: newCupcake.size,
            rating: newCupcake.rating,
            image: newCupcake.image
        })
        const cupcake = new Cupcake(response.data.cupcake);
        return cupcake;
    }

    static async updateCupcake(id,cupcake,cupcakes) {
        if (!this.cupcakes) {
            this.cupcakes = cupcakes;
        }
        console.log(this.cupcakes);
        const response = await axios.patch(`${BASE_URL}/cupcakes/${id}`,{
            flavor: cupcake.flavor,
            size: cupcake.size,
            rating: cupcake.rating,
            image: cupcake.image
        });
        return response.data.cupcake;
    }

    static async deleteCupcake(id,cupcakes) {
        await axios.delete(`${BASE_URL}/cupcakes/${id}`);
        console.log(typeof this.cupcakes)
        console.log(this.cupcakes)
        if (cupcakes.cupcakes) {
            this.cupcakes = cupcakes.cupcakes.filter(cupcake => cupcake.id !== id);
            console.log(typeof this.cupcakes)
            console.log(this.cupcakes)
            return this.cupcakes;
        }
        // this is here because once we filter the first set of Cupcakes from 
        // the JSON data, we are left with just Cupcakes and not Cupcakes.Cupcakes
        // So we filter only on cupcakes as an array itself.
        else {
            this.cupcakes = cupcakes.filter(cupcake => cupcake.id !== id);
            console.log(typeof this.cupcakes)
            console.log(this.cupcakes)
            return this.cupcakes;
        }
        
    }
}

/**
 * This Cupcake class is basically a way of taking the response from the server
 * when doing requests and turning it into a more readable object for javascript
 */
class Cupcake {
    constructor(cupcakeObj) {
        this.id = cupcakeObj.id;
        this.flavor = cupcakeObj.flavor;
        this.size = cupcakeObj.size;
        this.rating = cupcakeObj.rating;
        this.image = cupcakeObj.image;
    }
}