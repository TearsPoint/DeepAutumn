/**
 * Created by 衡 on 15-7-18.
 */

module.exports = function chat_event_args()
{
    this.event_name = '';
    this.from_uid = 0;
    this.to_uid = 0;
    this.data ='';
    this.get_full_msg =function()
    {
        var full_msg = this.event_name + ',' + this.from_uid + ',' + this.to_uid +',' + this.data;
        console.log('get_full_msg()...',this.from_uid, full_msg);
        return full_msg;
    };
}