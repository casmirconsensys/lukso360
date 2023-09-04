query JacobsNFTs {
    tokens(networks: [{network: ETHEREUM, chain: MAINNET}], 
          pagination: {limit: 3}, 
          where: {ownerAddresses: "jacob.eth"}) {
      nodes {
        token {
          collectionAddress
          tokenId
          name
          owner
          image {
            url
          }
          metadata
        }
      }
    }
  }

  query TotalAddressSales {
    aggregateStat {
      salesVolume(where: {ownerAddresses: "jacob.eth"}) {
        totalCount
        chainTokenPrice
      }
    }
  }

  query TopPurchaseForAnAddress {
    sales(where: {buyerAddresses: "jacob.eth"}, 
          sort: {sortKey: NATIVE_PRICE, sortDirection: DESC}, 
          pagination: {limit: 1}) {
      nodes {
        sale {
          price {
            nativePrice {
              decimal
            }
          }
          saleType
          sellerAddress
          transactionInfo {
            transactionHash
            blockTimestamp
          }
        }
        token {
          collectionAddress
          tokenId
          name
          description
        }
      }
    }
  }

  query TokenEvents {
    token(token: {address: "0xc729Ce9bF1030fbb639849a96fA8BBD013680B64", tokenId: "246"}) {
      events(sort: {sortKey: CREATED, sortDirection: ASC}) {
        eventType
        transactionInfo {
          blockTimestamp
          transactionHash
        }
      }
    }
  }

  query TokenSale {
    token(token: {address: "0xc729Ce9bF1030fbb639849a96fA8BBD013680B64", tokenId: "246"}) {
      sales {
        saleType
        saleContractAddress
        sellerAddress
        buyerAddress
        transactionInfo {
          blockTimestamp
          transactionHash
        }
        price {
          nativePrice {
            decimal
            currency {
              name
            }
          }
        }
      }
    }
  }

  
