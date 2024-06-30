import React from 'react'
import { Helmet } from 'react-helmet-async'

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: "Bienvenido a Abuelo Tecno",
    description: "Vendemos lo mejor para el cliente más exigente",
    keywords: "electronicos, marca, barato, confiable, venta",
}

export default Meta