import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from'next/router'
import Head from 'next/head';

function NewMeetupPage() {
    const router  = useRouter()
    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
        router.push('/')
    }


    return (
        <>
            <Head>
                <title>New Meetup</title>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    );
}

export default NewMeetupPage;