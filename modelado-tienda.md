# Entidades y Atributos

## Usuario
- ID_Usuario (PK) - INT
- Nombre - STRING
- Correo - STRING
- Teléfono - STRING
- Dirección - STRING

## Producto
- ID_Producto (PK) - INT
- Nombre - STRING
- Descripción - STRING
- Precio - FLOAT
- Stock - INT
- Tipo - STRING

## Pedido
- ID_Pedido (PK) - INT
- ID_Usuario (FK)
- Fecha - INT
- Total - FLOAT

## Detalle_Pedido
- ID_Detalle (PK) - INT
- ID_Producto (FK)
- ID_Pedido (FK)
- Cantidad - INT
- PrecioUnitario - FLOAT
- VarianteSeleccionada - INT

## MétodoPago
- ID_Metodo (PK) - INT
- Detalles - STRING
- Tipo - STRING

## Pago
- ID_Pago (PK) - INT
- ID_MetodoPago (FK)
- ID_Pedido (FK)
- Monto - FLOAT
- FechaPago - INT
- EstadoPago - BOOL

## Relaciones
- Un Pedido pertenece a un Usuario
- Un Usuario puede hacer muchos Pedidos (1:N)
- Un Detalle_Pedido está asociado a un Producto 
- Un Pedido puede tener muchos Detalle_Pedido (1:N)
- Un Pago utiliza un MétodoPago (1:1)
- Un Pedido puede tener un Pago (1:1)

# Diagrama Relacional

![Diagrama Relacional](/assets/modelado-tienda.png)

# Diagrama Supabase
![Diagrama Supabase](/assets/PRÁCTICA12.png)


