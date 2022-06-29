import supabase from "./dbConfig.js";

const getRecording = async id => {
    try {
        const {data, error} = await supabase
            .from('recordings')
            .select()
            .match({id});
            
        if (error) throw error
        return data
    } catch (e) {
        throw e
    }
}

const addRecording = async recording => {
    try {
        const {data, error} = await supabase
            .from('recordings')
            .insert(recording)

        if (error) throw error
        return data
    } catch (e) {
        console.warn(e);

        return null;
    }
}

const editRecording = async recording => {
    try {
        const {data, error} = await supabase
            .from('recordings')
            .update(recording)
            .match({id: recording.id});

        if (error) throw error
        return data
    } catch (e) {
        throw e
    }
}

const deleteRecording = async id => {
    try {
        const {data, error} = await supabase
            .from('recordings')
            .delete()
            .match({id});

        if (error) throw error
        return data
    } catch (e) {
        throw e
    }
}


export default {
    getRecording,
    addRecording,
    editRecording,
    deleteRecording
}