module.exports = (mongoose) => {
  const Product = mongoose.model(
    "produits",
    mongoose.Schema(
      {
        libelle: String,
        prix: String,
        categorie: String,
        email: String,
      },
      { timestamps: true }
    )
  );

  return Product;
};
