import axios from "axios";

class UserService {
    baseURL = "http://localhost:8080/users";

    /**
     * @returns Une liste de tous les utilisateurs sous forme JSON
     * @throws Erreur en cas d'échec de la requête
     */
    async getAllUsers() {
        try {
            const response = await axios.get(this.baseURL);
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
        }
    }

    /**
     * @param userId L'identifiant de l'utilisateur
     * @returns Les détails de l'utilisateur correspondant à l'identifiant sous forme JSON
     * @throws Erreur en cas d'échec de la requête
     */
    async getUserById(userId) {
        try {
            const response = await axios.get(`${this.baseURL}/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des détails de l'utilisateur: ${error.message}`);
        }
    }

    /**
     * @param userId L'identifiant de l'utilisateur
     * @param userData Les nouvelles données de l'utilisateur
     * @returns Les données mises à jour de l'utilisateur sous forme JSON
     * @throws Erreur en cas d'échec de la requête
     */
    async updateUser(userId, userData) {
        try {
            const response = await axios.put(`${this.baseURL}/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour de l'utilisateur: ${error.message}`);
        }
    }

    /**
     * @param userId L'identifiant de l'utilisateur
     * @param isConnected Statut de connexion de l'utilisateur
     * @returns Les données mises à jour de l'utilisateur sous forme JSON
     * @throws Erreur en cas d'échec de la requête
     */
    async updateIsConnected(userId, isConnected) {
        try {
            const response = await axios.put(`${this.baseURL}/${userId}/isConnected`, { isConnected: isConnected }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour de isConnected: ${error.message}`);
        }
    }

    /**
     * @param userId L'identifiant de l'utilisateur
     * @returns Les données mises à jour de l'utilisateur après connexion sous forme JSON
     * @throws Erreur en cas d'échec de la requête
     */
    async loginUser(userId) {
        try {
            const updatedUser = await this.updateIsConnected(userId, true);
            localStorage.setItem('userId', userId); // Stocker l'ID de l'utilisateur dans le local storage
            return updatedUser;
        } catch (error) {
            throw new Error(`Erreur lors de la connexion de l'utilisateur: ${error.message}`);
        }
    }

    /**
     * @param userId L'identifiant de l'utilisateur
     * @returns Les données mises à jour de l'utilisateur après déconnexion sous forme JSON
     * @throws Erreur en cas d'échec de la requête
     */
    async logoutUser(userId) {
        try {
            const updatedUser = await this.updateIsConnected(userId, false);
            localStorage.removeItem('userId'); // Supprimer l'ID de l'utilisateur du stockage
            return updatedUser;
        } catch (error) {
            throw new Error(`Erreur lors de la déconnexion de l'utilisateur: ${error.message}`);
        }
    }

    /**
     * @returns L'ID de l'utilisateur actuellement connecté depuis le local storage
     */
    getLoggedInUserId() {
        return localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur depuis le local storage
        // Solution de contournement que l'on a mis en place pour quand meme nous permettre d'avoir un systeme de User
        // Car comme discuté avec Mme.Bianchi nous n'avons pas vu la réelle facon de faire et nous n'allons pas avoir le temps de le faire
    }

    /**
     * Met à jour l'email de l'utilisateur
     * @param userId L'identifiant de l'utilisateur
     * @param newEmail Le nouvel email de l'utilisateur
     * @returns Les données mises à jour de l'utilisateur sous forme JSON
     * @throws Erreur en cas d'échec de la requête
     */
    async updateUserEmail(userId, newEmail) {
        try {
            const response = await axios.put(`${this.baseURL}/${userId}/email`, { email: newEmail });
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour de l'email de l'utilisateur: ${error.message}`);
        }
    }

    /**
     * Ajoute de l'argent au portefeuille de l'utilisateur
     * @param userId L'identifiant de l'utilisateur
     * @param amount Le montant à ajouter
     * @returns Les données mises à jour de l'utilisateur sous forme JSON
     * @throws Erreur en cas d'échec de la requête
     */
    async addMoneyToWallet(userId, amount) {
        try {
            const response = await axios.put(`${this.baseURL}/${userId}/wallet`, { amount: amount });
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de l'ajout d'argent au portefeuille de l'utilisateur: ${error.message}`);
        }
    }
    /**
    * Déduit de l'argent du portefeuille de l'utilisateur
    * @param userId L'identifiant de l'utilisateur
    * @param amount Le montant à déduire
    * @returns Les données mises à jour de l'utilisateur sous forme JSON
    * @throws Erreur en cas d'échec de la requête
    */
     async deductFromWallet(userId, amount) {
        try {
            const response = await axios.put(`${this.baseURL}/${userId}/wallet/deduct`, { amount: amount });
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la déduction du portefeuille de l'utilisateur: ${error.message}`);
        }
    }
}

export default new UserService();


