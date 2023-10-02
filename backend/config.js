export const PORT = 5555;

const dbUsername = "root";
const dbPassword = "root";
const dbName = "books-collection";

export const mongoDBURL = `mongodb+srv://${dbUsername}:${dbPassword}@storysage-mern.8wqzdgn.mongodb.net/${dbName}?retryWrites=true&w=majority`;
