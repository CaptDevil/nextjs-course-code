import MeetupDetail from '../../components/meetups/MeetupDetail'
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'

function MeetupDetailsPage({ title, image, address, description }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <MeetupDetail
                title={title}
                image={image}
                address={address}
                description={description}
            />
        </>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(process.env.MONDODB_URI)
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
    client.close()
    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect(process.env.MONDODB_URI)
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const meetup = await meetupCollection.findOne({_id: ObjectId(meetupId)})
    
    return {
        props: {
            id: meetupId,
            title: meetup.title,
            image: meetup.image,
            address: meetup.address,
            description: meetup.description
        }
    }
}

export default MeetupDetailsPage;