import MeetupList from '../components/meetups/MeetupList';
import React from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head'

function HomePage({ meetups }) {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content='Browse a huge list of highly active React meetups!' />
            </Head>
            <MeetupList meetups={meetups} />
        </>
    );
}

/*export async function getServerSideProps() {
    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    }
}*/

export async function getStaticProps() {
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    }
}

export default HomePage;