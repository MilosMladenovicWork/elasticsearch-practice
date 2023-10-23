const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200', })

const run = async () => {
    await client.indices.delete({ index: '_all' })

    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Ned Stark',
            quote: 'Winter is coming.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Daenerys Targaryen',
            quote: 'I am the blood of the dragon.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Tyrion Lannister',
            quote: 'A mind needs books like a sword needs whetstone.'
        }
    })

    await client.indices.refresh({ index: 'game-of-thrones' })

    const { body } = await client.search({
        index: 'game-of-thrones',
        body: {
            query: {
                match: { quote: 'needs' }
            }
        }
    })

    console.log(body.hits.hits)
}

run()
