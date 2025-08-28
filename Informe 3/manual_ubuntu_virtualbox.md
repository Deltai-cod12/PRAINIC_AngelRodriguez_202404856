# Manual de Instalación de Ubuntu en VirtualBox

**Nombre:** Angel Emanuel Rodriguez Corado  
**Carné:** 202404856  

---

## 1. Introducción

Este manual explica paso a paso cómo instalar **Ubuntu** en una máquina virtual utilizando **VirtualBox**, sin necesidad de borrar o afectar el sistema operativo principal de tu computadora. Se incluyen tanto instrucciones gráficas como comandos útiles de Linux para una experiencia completa.

---

## 2. Requisitos

Antes de comenzar, asegúrate de tener:

- Una computadora con Windows, macOS o Linux.
- Al menos **8 GB de RAM** (recomendado mínimo 4 GB).
- **20 GB de espacio libre en disco** para la máquina virtual.
- Conexión a internet para descargar los archivos necesarios.
- Software:
  - **VirtualBox** (última versión)
  - **Ubuntu ISO** (última versión estable de Ubuntu Desktop, por ejemplo 24.04 LTS)

---

## 3. Descarga de VirtualBox

1. Visita la página oficial de VirtualBox: [https://www.virtualbox.org/](https://www.virtualbox.org/)
2. Selecciona tu sistema operativo y descarga el instalador.
3. Ejecuta el instalador y sigue los pasos:
   - Acepta los términos de licencia.
   - Selecciona los componentes a instalar (recomendado dejar por defecto).
   - Acepta la instalación de los drivers de red si lo solicita.
   - Finaliza la instalación.

---

## 4. Descarga de Ubuntu

1. Ve a la página oficial de Ubuntu: [https://ubuntu.com/download/desktop](https://ubuntu.com/download/desktop)
2. Descarga la versión **Ubuntu Desktop LTS** (Long Term Support) para estabilidad y soporte extendido.
3. Guarda el archivo `.iso` en una ubicación accesible, por ejemplo `C:\Users\Angel\Descargas\Ubuntu.iso`.

---

## 5. Creación de la Máquina Virtual en VirtualBox

1. Abre **VirtualBox**.
2. Haz clic en **Nuevo**.
3. Completa los campos:
   - **Nombre:** Ubuntu
   - **Tipo:** Linux
   - **Versión:** Ubuntu (64-bit)
4. Asigna memoria RAM:
   - Recomendado: 4096 MB o más.
5. Crea un disco duro virtual:
   - Tipo de archivo: VDI (VirtualBox Disk Image)
   - Almacenamiento: Dinámicamente asignado
   - Tamaño recomendado: 20 GB o más
6. Haz clic en **Crear**.

---

## 6. Configuración de la Máquina Virtual

Antes de iniciar la VM:

1. Selecciona la máquina Ubuntu y haz clic en **Configuración**.
2. En la pestaña **Sistema**:
   - Orden de arranque: Asegúrate que **Disco óptico** esté primero.
3. En la pestaña **Pantalla**:
   - Video RAM: Ajusta a 128 MB (si tu GPU lo permite).
4. En la pestaña **Almacenamiento**:
   - Selecciona el **controlador IDE**.
   - Haz clic en el icono del disco y selecciona **Elegir un archivo de disco óptico virtual**.
   - Selecciona el archivo `.iso` descargado de Ubuntu.
5. En la pestaña **Red**:
   - Tipo de adaptador: NAT (para conexión a internet).

---

## 7. Instalación de Ubuntu

1. Inicia la máquina virtual.
2. Selecciona **Instalar Ubuntu**.
3. Configura:
   - Idioma: Español
   - Distribución de teclado: Español
4. Tipo de instalación:
   - Selecciona **Borrar disco e instalar Ubuntu** (esto solo afecta el disco virtual, no tu PC).
5. Configura usuario y contraseña:
   - Nombre: Angel Emanuel Rodriguez Corado
   - Nombre de usuario: angel
   - Contraseña: [elige una segura]
6. Haz clic en **Instalar** y espera a que finalice.
7. Al terminar, reinicia la máquina virtual.
8. Retira la ISO de la unidad virtual para evitar reinicios en bucle.

---

## 8. Primer inicio y actualización de Ubuntu

### 8.1 Actualizar repositorios

Abre la terminal y ejecuta:

```bash
sudo apt update
sudo apt upgrade -y
```

Esto asegura que tu sistema esté completamente actualizado.

### 8.2 Instalar herramientas útiles

Algunas herramientas recomendadas:

```bash
sudo apt install build-essential git curl wget -y
sudo apt install gnome-tweaks -y
```

- `build-essential`: compila programas.
- `git`: control de versiones.
- `curl` y `wget`: descarga archivos desde la terminal.
- `gnome-tweaks`: personalización del escritorio.

#### Comandos básicos de Linux

- Ver directorio actual:

```bash
pwd
```

- Listar archivos:

```bash
ls -la
```

- Crear directorio:

```bash
mkdir CarpetaPrueba
```

- Navegar entre carpetas:

```bash
cd CarpetaPrueba
```

- Mover o renombrar archivos:

```bash
mv archivo1.txt archivo2.txt
```

- Copiar archivos:

```bash
cp archivo1.txt CarpetaPrueba/
```

- Eliminar archivos o carpetas:

```bash
rm archivo1.txt
rm -r CarpetaPrueba/
```

---

## 9. Configuración adicional (opcional)

### 9.1 Instalar Guest Additions

1. En VirtualBox: `Dispositivos` → `Insertar imagen de CD de las Guest Additions`.
2. En Ubuntu:

```bash
sudo mount /dev/cdrom /mnt
cd /mnt
sudo ./VBoxLinuxAdditions.run
```

Beneficios:
- Mejor resolución de pantalla.
- Integración del portapapeles.
- Carpetas compartidas.

### 9.2 Configuración de carpetas compartidas

1. VirtualBox: Configuración → Carpetas compartidas → Añadir carpeta.
2. Montaje automático en Ubuntu:

```bash
sudo mount -t vboxsf CarpetaCompartida /home/angel/CarpetaCompartida
```

---

## 10. Consejos finales

- No apagues la máquina virtual cerrando la ventana; usa `Cerrar` → `Guardar el estado de la máquina`.
- Haz snapshots frecuentes para guardar estados de tu VM.
- Practica comandos de Linux para familiarizarte con Ubuntu.
- Documenta cambios importantes dentro de tu VM para futuras referencias.
- Mantén tu Ubuntu actualizado regularmente con:

```bash
sudo apt update
sudo apt upgrade -y
```

---

**¡Listo!** Ahora tienes Ubuntu instalado en VirtualBox, completamente aislado de tu sistema operativo principal y listo para usar.

---

**Autor:** Angel Emanuel Rodriguez Corado  
**Carné:** 202404856

