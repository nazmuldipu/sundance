const  Client = require('./apollo.cjs')
const { gql } = require('@apollo/client/core')

/**
 * Fetch page data
 * 
 * @param {string} brandSlug 
 * @param {string} pagePath
 * @return {promise} promise
 */
async function fetchPageData(brandSlug, pagePath, query = ''){
    
    let PAGE_QUERY = gql`
    query Query($contentBySlugPagePath: String!, $contentBySlugBrandSlug: String!) {
        contentBySlug(pagePath: $contentBySlugPagePath, brandSlug: $contentBySlugBrandSlug) {
          values
          name
          title
          order
        }
      }
    `
    const result = await Client.query({
      query: PAGE_QUERY,
      variables: {
          "contentBySlugPagePath": pagePath,
          "contentBySlugBrandSlug": brandSlug

      }
    })
    return result
}

module.exports = fetchPageData

