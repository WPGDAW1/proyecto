# Guia de usuario - SUPUESTO 4
### Para ejecutar todo el desarrollo y así poder enviar el correo al usuario final que desees, habrá que seguir una serie de pasos, pero ten en cuenta que este proceso se ha realizado en una instancia ec2 del proveedor AWS y entregaremos los correos desde un correo de office 365.

## PASOS

1. Descargar de la carpeta, **FeriaValencia.sql** para crear la base de datos.

    - Una vez descargado, agrega su código a un sistema gestor de base de datos compatible con mysql y ejecuta el código.

2. Una vez implementado la base de datos, **descarga "suscriptores.csv" y "enviabbdd.java"**.
3. Actualiza **suscriptores.csv** Modificando/Agregando nombres de usuario y sus datos correspondientes. Siempre que agregues un suscriptor, el **campo correspondiente suscrito** debe aparecer como 1 en cada registro dentro del csv.
4. Una vez actualizado, descarga las dependencias de bbdd **mysql-connector-j-9.2.0.jar** y agregalo a la misma carpeta que el resto de archivos. Dicho esto, pasemos al envío de usuarios que agregaste en el archivo **suscriptores.csv**

    - Para compilar el archivo enviabbdd.java usando la libreria del archivo .jar:
    ```
        javac -cp mysql-connector-j-9.2.0.jar enviabbdd.java
    ```
    - Para ejecutar, solo modificamos javac por java:
    ```
        java -cp mysql-connector-j-9.2.0.jar enviabbdd.java
    ```
    - Para asegurarte que al ejecutar, se envían correctamente, aparecerá un mensaje como este:
    ```
        Se agregaron 10 registros correctamente
    ```

5. Una vez entregado a la base de datos todos los usuarios con sus correos y sus datos necesarios, pasaremos al envío de correo para comprobar si de verdad enviamos correos a los usuarios finales. **Pero antes, debemos realizar 4 pasos importantes**
    - Descargar el archivo sendyregistro.js y enviarlo a la misma carpeta
    - Descargar el archivo .env y enviarlo a la misma carpeta. En este archivo se asignarán las credenciales de usuario para enviar el correo y las credenciales de la base de datos a la que conectaremos para volcar correos de usuarios y enviar el mail
    
    - Instalar mjml y npm:
        ```
            sudo apt install mjml npm -y
        ```
    - Instalar las dependencias necesarias para el proceso:
        ```
            npm install mjml nodemailer dotenv mysql2 
        ```

6. Una vez configurado e instalado, podremos realizar pruebas de envío de correo ejecutando el archivo js:
    ```
        node sendyregistro.js
    ```
    - Desde terminal te informarán de manera clara si hay algún error desde donde se ubica, normalmente puede existir error desde el archivo .env si las credenciales de usuario son erroneas, o similar con las credenciales de acceso a la base de datos. **No obstante, para comprobar que el correo ha sido enviado con exito, aparecera en la terminal, a continuación una linea como**:
    ```
    Correo enviado a andresrigoberto91@gmail.com: 250 2.0.0 OK <de76d6cc-810f-e897-bea6-18d2ee4637c1@alu.edu.gva.es> [Hostname=AM8P194MB1076.EURP194.PROD.OUTLOOK.COM]
    ```

    ### ¡Listo! 