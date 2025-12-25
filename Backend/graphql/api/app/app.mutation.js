export const AppSettingsMutation = {
    UpdateFileSettings: async (parent, args, context)=> {
        return {
            maximum_file_transfer_by_unauthorized_user: 6
        }
    }
}