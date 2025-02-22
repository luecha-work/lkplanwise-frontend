# LkplanwiseFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# 📁 Project Folder Structure

โครงสร้างโฟลเดอร์ของโปรเจกต์ Angular เพื่อความเป็นระเบียบและง่ายต่อการจัดการโค้ด

## 1️⃣ **public/**

ใช้เก็บไฟล์ static ที่ต้องการเข้าถึงได้โดยตรง เช่น `favicon.ico`, รูปภาพ และไฟล์ assets อื่นๆ

```
📁 assets/ → เก็บรูปภาพ, ไอคอน, ฟอนต์ หรือไฟล์ JSON ที่ใช้ภายในแอป
⭐ favicon.ico → ไอคอนของเว็บไซต์ (ที่แสดงบนแท็บเบราว์เซอร์)
```

## 2️⃣ **assets/**

โฟลเดอร์สำหรับเก็บข้อมูลรูปภาพหรือไฟล์ที่ใช้ภายในแอป เช่น ไฟล์ไอคอน, ฟอนต์ หรือ JSON Configuration

## 3️⃣ **environments/**

โฟลเดอร์ที่ใช้สำหรับจัดการค่าคอนฟิกแยกระหว่าง Environment ต่างๆ เช่น **Development (dev)**, **Production (prod)**, **Staging**, หรือ **Testing**

## 4️⃣ **src/**

โฟลเดอร์หลักที่เก็บซอร์สโค้ดของแอป

```
📂 app/ → โฟลเดอร์หลักที่เก็บ Component, Module, Routing และ Services ของแอป
   - app.module.ts → ไฟล์หลักของโมดูลแอปพลิเคชัน
   - app.component.ts → คอมโพเนนต์หลักของแอป

📂 core/ → เก็บ Services และ Providers ที่เป็น Global (ใช้ได้ทั่วทั้งแอป)
   - auth.service.ts → จัดการ Authentication
   - http.service.ts → จัดการ HTTP Requests
   - interceptors/ → จัดการ HTTP Interceptors

📂 features/ → เก็บ Feature Modules หรือ โมดูลย่อยของแอป
   - user/ → ฟีเจอร์ที่เกี่ยวข้องกับผู้ใช้ (User Module)
   - dashboard/ → ฟีเจอร์ของ Dashboard
   - products/ → ฟีเจอร์ของสินค้า

📂 shared/ → เก็บ Reusable Components, Directives, Pipes และ Shared Modules
   - button.component.ts → ปุ่มที่ใช้ซ้ำในหลายจุด
   - modal.component.ts → Modal Dialog
   - custom.pipe.ts → Pipe ที่ใช้ในหลายจุด
```
