import {PostModel} from '../models.js'

export const create_a_single_post = async (data)=> {
    try {
        return (await PostModel.create({...data})).toObject();
    } catch(error) {
        throw new Error(error.message)
    }
}

export const count_post = async (params)=> {
    try {
        const { query = {} } = params;
        return await PostModel.countDocuments(query);
    }catch(error) {
        throw new Error(error.message);
    }
}

export const delete_post = async (params)=> {
    try {
        const { query = {} } = params;
        await PostModel.deleteMany(query);
    }catch(error) {
        throw new Error(error.message);
    }
}

export const get_all_post = async (params)=> {
    try {
        const { match_query, selected_fields = {}, sorted_fields = {}, page = 1, limit = 10 } = params;
        const pipeline = [
            {
                $match: match_query
            },
            {
                $lookup: {
                    from: 'tags',
                    as: "tags",
                    let: {
                        tags_ids: "$tags"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $in: [ "$id", "$$tags_ids"]
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        ]
        if (Object.keys(sorted_fields).length > 0) {
            pipeline.push({
                $sort: {
                    ...sorted_fields
                }
            })
        }else {
            pipeline.push({
                $sort: {
                    creteadAt: -1
                }
            })
        }
        pipeline.push({
            $skip: (page - 1) * limit
        })
        pipeline.push({
            $limit: limit
        })

        if (Object.keys(selected_fields).length > 0) {
            pipeline.push({
                $project: selected_fields
            })
        }
        return await PostModel.aggregate(pipeline);
    }catch(error) {
        throw new Error(error.message);
    }
}

export const get_single_post = async (query,selected_fields = {})=> {
    try {
        const pipeline = [
            {
                $match: { ...query}
            },
            {
                $lookup: {
                    from: 'tags',
                    as: "tags",
                    let: {
                        tags_ids: "$tags"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $in: [ "$id", "$$tags_ids"]
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        ]
        if(Object.keys(selected_fields).length > 0) {
            pipeline.push({ $project: selected_fields});
        }
        const postData = await PostModel.aggregate(pipeline);
        console.log("postData", postData);
        return postData && Array.isArray(postData) && postData.length > 0  ? postData[0] : null;
    }catch(error) {
        throw new Error(error.message);
    }
}

export const update_single_post = async (params) => {
    try {
        const { query, update_data } = params;
        await PostModel.findOneAndUpdate({...query}, {
            $set: {
                ...update_data
            }
        }).lean();
        const pipeline = [
            {
                $match: query
            },
            {
                $lookup: {
                    from: 'tags',
                    as: "tags",
                    let : {
                        tags_ids: "$tags"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $in: [ "$id", "$$tags_ids"]
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        ];
        const updated_data = await PostModel.aggregate(pipeline);
        return updated_data && Array.isArray(updated_data) && updated_data.length > 0 ? updated_data[0] : null;
    }catch(error) {
        throw new Error(error.message);
    }
}
