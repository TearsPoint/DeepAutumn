/**
 * Created by 衡 on 15-7-18.
 */

var chat_event_args = require('./chat_event_args');
var runtime = require('./runtime');

function send_to_all(from_uid,msg,to_uid)
{
    for(var n=0; n< runtime.websocket_sessions.length; n++)
    {
        var wss = runtime.websocket_sessions[n];
        if(from_uid !==wss.uid)
        {
            wss.web_socket_client.send(msg);
        }
    }
}

module.exports = function WebSocketSession()
{
    this.uid = 0;
    this.u_name = '';
    this.web_socket_client = null;
    this.set_web_socket_client = function(client)
    {
        this.web_socket_client = client;
        client.uid = this.uid;
        client.onmessage = function(event)
        {
            console.log('[onmessage]',event.data)
            var array = event.data.split(',');
            var ce_args = new chat_event_args();
            ce_args.event_name = array[0];
            ce_args.from_uid = client.uid;
            ce_args.to_uid = array[2];
            ce_args.data = array[3];

            if(array[0]=='LIN')
            {
                client.u_name = ce_args.data;
                var online_info ='';
                for(var n=0; n< runtime.websocket_sessions.length; n++)
                {
                    var wss = runtime.websocket_sessions[n];
                    console.log('wss.u_name:',wss.uid, wss.u_name, '  client.u_name',client.uid, client.u_name)
                    if(wss.uid == ce_args.from_uid)
                        wss.u_name = client.u_name;
                    online_info += wss.uid + "|" + wss.u_name + ";";
                }
                if(online_info!=undefined && online_info.length>0)
                {
                    online_info = online_info.substring(0,online_info.length-1);
                    console.log(online_info);
                   client.send("OLN,0," + ce_args.from_uid + "," + online_info);
                }
                send_to_all(ce_args.from_uid,ce_args.get_full_msg());
            }
            else  if(array[0]=='MSG')
            {
                send_to_all(ce_args.from_uid,ce_args.get_full_msg());
            }
            else
            {
                send_to_all(ce_args.from_uid,ce_args.get_full_msg());
            }
        };
        client.onclose = function(event) {
            send_to_all(client.uid, 'OUT,'+ client.uid + ',0,' + client.uid );
            console.log('[close]', event.code, event.reason);
            var t = runtime.websocket_sessions.filter(function(){return isCurrentClient(client)>=0;});
            if(t.length>0)
            {
                console.log('runtime.websocket_sessions.length',runtime.websocket_sessions.length);
                runtime.websocket_sessions=runtime.websocket_sessions.splice(isCurrentClient(client),1);//退出
                console.log('runtime.websocket_sessions.length',runtime.websocket_sessions.length);
                console.log(client.uid,'成功退出');
            }
        };
    }
}

var isCurrentClient = function (client)
{
    for(var i=0; i<runtime.websocket_sessions.length; i++)
    {
        if(runtime.websocket_sessions[i].web_socket_client === client)
            return i;
    }
    return -1;
};


