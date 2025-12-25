
export const AppSettingsQuery = {
    GetAppSettings: async (parent, args, context ) => {        
        return {
            maximum_file_transfer_by_unauthorized_user: 5
        }
    }
}