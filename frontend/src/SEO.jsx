import { Helmet } from "react-helmet-async"

const SEO = ({ title, description, canonical }) => (
  <Helmet>
    {title && <title>{title}</title>}

    {description && (
      <meta 
        name="description" 
        content={description} 
      />
    )}

    {canonical && (
      <link 
        rel="canonical" 
        href={canonical} 
      />
    )}

    <link rel="icon" href="/logo-full-transparent.webp" type="image/webp" />
  </Helmet>
)

export default SEO