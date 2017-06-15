# Instalacion

## Requisitos 

* nodejs, actualmente funcionando con la versión 6.10.2
* npm, por ejemplo la version 3.3.10
* Un navegador web instalado en el entorno, por ejemplo Chrome.

## Pasos de instalacion

Clonado del repositorio:

```
git clone https://github.com/mizhal/journal-material-ionic
cd journal-material-ionic
```

Instalación de dependencias, esto instalará gestores de dependencias y de automatización adicionales como gulp y bower.

```
npm install
```

## Arranque de la aplicación

El siguiente comando arranca la aplicación en modo interactivo y lanza la vista previa en el navegador web del sistema:

```
ionic serve
```

Si no se ha abierto el navegador, la aplicación puede verse en [este enlace](http://localhost:8100).

## Ejecutar tests

Para ejecutar los tests automáticos, tomárselo con **karma** ;):

```
karma start
```