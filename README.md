# README


> **🔹 Variant 0 is used (20/4)**

### ▶️ Running the project

1. **Clone the repository:**
   ```sh
   git clone https://github.com/AndriiSolomka/Nest_MTSD.git
   cd Nest_MTSD
   ```

2. **Start Docker Compose:**
   ```sh
   docker-compose up --build
   ```

---

## ✅ Testing

### 🔹 Run unit tests
```sh
docker-compose exec app npm run test
```

---

## 🔍 Висновки
🔹 Я давно хотів спробувати самостійно написати unit tests і налаштувати CI/CD.
🔹 Виявилося дуже зручним покривати код тестами, тому що це дало змогу модифікувати мої класи і не перевіряти "вручну" коректність нових методів.
🔹 Я швидко перевіряв новий функціонал без ризику порушення працездатності мого додатка.

