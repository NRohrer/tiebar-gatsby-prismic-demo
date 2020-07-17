import React from "react"
import { Grid } from '@material-ui/core'
import indexStyles from '../styles/index.module.css'
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query HomePageQuery {
    prismicHomepage {
      data {
        heroheader
        herosubheader
        heroactionurl
        heroactiontext
        heroimageurl
      }
    }
  }
`
const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <Grid style={{ position: 'relative' }} className={indexStyles.homePageHeaderRootGrid} >
        <a href={data.prismicHomepage.data.heroactionurl}>
          <Grid className={indexStyles.homePageHeaderGrid}>
            <img
              src={data.prismicHomepage.data.heroimageurl}
              className={indexStyles.heroImage}
              alt={data.prismicHomepage.data.heroactiontext}
            />
            <Grid container justify="flex-end" className={indexStyles.homePageHeaderOuterGrid} >
              <div className={indexStyles.homePageHeaderTextGrid}>
                <h1 className={indexStyles.homePageHeaderLevelOne}>
                  {data.prismicHomepage.data.heroheader}
                </h1>
                <h3 className={indexStyles.homePageSubHeader}>
                  {data.prismicHomepage.data.herosubheader}
                </h3>
                <button className={indexStyles.homePageHeaderButton}>
                  <span>{data.prismicHomepage.data.heroactiontext}</span>
                </button>
              </div>
            </Grid>
          </Grid>
          </a>
      </Grid>
    {/* <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
  </Layout>
)

export default IndexPage
