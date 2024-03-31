import { request, gql } from 'graphql-request'

const MASTER_URL='https://api-ap-south-1.hygraph.com/v2/cls6f05ap0lb101uqkobsy146/master';
const getCategory = async () => {
    const query = gql
    `query getCategory {
        categories {
          id
          name
          icon {
            url
          }
        }
      }
      `
      const result = await request(MASTER_URL, query)
      return result;
}

const getTestnet = async () => {
  const query = gql`query getTestnet {
    testnets(first: 50, orderBy: publishedAt_DESC) {
      name
      id
      banner {
        url
      }
      video {
        id
        url
      }
      detail
    }
  }
   `
  const result = await request(MASTER_URL, query)
      return result;
}

const getSolana = async () => {
  const query = gql`query getSolana {
    solanas(first: 50, orderBy: publishedAt_DESC) {
      name
      id
      banner {
        url
      }
      video {
        id
        url
      }
      detail
    }
  }  
   `
  const result = await request(MASTER_URL, query)
      return result;
}
const getLayer2 = async () => {
  const query = gql`query getLayer2 {
    l2S(first: 50, orderBy: publishedAt_DESC) {
      name
      id
      banner {
        url
      }
      video {
        id
        url
      }
      detail
    }
  }
  `
  
  const result = await request(MASTER_URL, query)
      return result;
}
const getDex = async () => {
  const query = gql`query getDex {
    dexes(first: 50, orderBy: publishedAt_ASC) {
      name
      id
      banner {
        url
      }
      video {
        id
        url
      }
      detail
    }
  }  
  `
  
  const result = await request(MASTER_URL, query)
      return result;
}

  const getYoutuber = async () => {
  const query = gql`query getYoutuber {
    youtubers {
      name
      banner {
        url
      }
    }
  }
   `
  const result = await request(MASTER_URL, query)
      return result;
}
  const getCryptoHindi = async () => {
  const query = gql`query getCryptoHindi {
    cryptohindis(first: 20, orderBy: publishedAt_DESC) {
      id
      thumbnail {
        url
      }
      name
      video {
        id
        url
      }
      description
    }
  }
  `
  const result = await request(MASTER_URL, query)
      return result;
}
  const getCryptogg = async () => {
  const query = gql`query getCryptogg {
    cryptoggs(first: 10, orderBy: publishedAt_ASC) {
      id
      thumbnail {
        url
      }
      name
      video {
        id
        url
      }
      description
    }
  }  
  `
  const result = await request(MASTER_URL, query)
      return result;
}
  const getFeatureEarning = async () => {
  const query = gql`query getFeatureEarning {
    featureEarnings(first: 10, orderBy: publishedAt_ASC) {
      id
      thumbnail {
        url
      }
      name
      video {
        url
      }
      description
    }
  }
  
  `
  const result = await request(MASTER_URL, query)
      return result;
}


export default {
    getCategory,
    getTestnet,
    getSolana,
    getLayer2,
    getDex,
    getYoutuber,
    getCryptoHindi,
    getCryptogg,
    getFeatureEarning
}