
import axios from "axios";
/**
 * @description fetch GraphQL data via axios 
 * @param id the id of stop
 * @returns stopList array
 */
export async function getStopData(id) {
  try {
    // eslint-disable-next-line no-undef
    const res = await axios({
      method: "POST",
      url: process.env.VUE_APP_GraphQLHost,
      data: {
        query: `
            {
              stop(id: "${id}")
              {
                  gtfsId
                  name
                  lat
                  lon
                  patterns {
                    code
                    directionId
                    headsign
                    route {
                      gtfsId
                      shortName
                      longName
                      mode
                    }
                  }
                }
              }
            }
        `,
      },
    });
    return res.data
  } catch (error) {
    console.error(error);
    return null
  }
}