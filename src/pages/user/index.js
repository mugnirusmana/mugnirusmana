import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@material-tailwind/react";

import { defaultUserList, getUserList } from './../../redux/userListSlice';

import BreadCrumb from "../../components/breadcrumb";
import DataTable from '../../components/data-table';
import SelectOption from "../../components/select-option";
import Alert from "../../components/alert";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [selectData, setSelectData] = useState({})
  const [currnetPage, setCurrentPage] = useState('1');
  const [perPage, setPerPage] = useState('10');
  const userList = useSelector(({ userList }) => userList);
  const [filter, setFilter] = useState({
    keyword: '',
    status: {value: '', label: ''},
    role: {value: '', label: ''},
  });
  const [alertConfirm, setAlertConfirm] = useState({
    show: false,
    title: '',
    message: '',
    onCancel: () => {},
    onConfirm: () => {},
  })

  const title = [
    {
      label: 'Name',
      object: 'name',
      titlePosition: 'left',
      customRender: (data) => {
        return <span className="whitespace-nowrap">{data?.profile?.name}</span>
      }
    },
    {
      label: 'Email',
      object: 'email',
      titlePosition: 'left',
      customRender: (data) => {
        return <span className="whitespace-nowrap">{data?.email}</span>
      }
    },
    {
      label: 'Username',
      object: 'username',
      titlePosition: 'left',
      customRender: (data) => {
        return <span className="whitespace-nowrap">{data?.username??'-'}</span>
      }
    },
    {
      label: 'Phone',
      object: 'phone',
      titlePosition: 'left',
      customRender: (data) => {
        return <span className="whitespace-nowrap">{data?.profile?.phone}</span>
      }
    },
    {
      label: 'Role',
      object: 'role',
      customRender: (data) => {
        if (data?.role === 'admin') {
          return <div className="w-full flex items-center justify-center"><span className="text-xs bg-amber-600 rounded p-1 text-white text-center whitespace-nowrap">Admin</span></div>
        } else {
          return <div className="w-full flex items-center justify-center"><span className="text-xs bg-teal-600 rounded p-1 text-white text-center whitespace-nowrap">Staff</span></div>
        }
      }
    },
    {
      label: 'Status',
      object: 'status',
      customRender: (data) => {
        if (parseInt(data?.status) === 1) {
          return <div className="w-full flex items-center justify-center"><span className="text-xs bg-blue-600 rounded p-1 text-white text-center whitespace-nowrap">Inactive</span></div>
        } else if (parseInt(data?.status) === 2) {
          return <div className="w-full flex items-center justify-center"><span className="text-xs bg-green-600 rounded p-1 text-white text-center whitespace-nowrap">Active</span></div>
        } else if (parseInt(data?.status) === 3) {
          return <div className="w-full flex items-center justify-center"><span className="text-xs bg-red-600 rounded p-1 text-white text-center whitespace-nowrap">Disabled</span></div>
        }
      }
    }
  ];

  useEffect(() => {
    setFirstLoaded(true);
  }, []);

  useEffect(() => {
    if (firstLoaded) {
      setFirstLoaded(false);
      getListData({
        keyword: filter?.keyword !== '' ? filter?.keyword : null,
        status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
        role: filter?.role?.value??null,
        page: parseInt(1),
        perPage: parseInt(10),
      });
    }
  }, [firstLoaded]);

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage
    } = userList;

    if (!isLoading && isSuccess) {
      dispatch(defaultUserList());
    }

    if (!isLoading && isError) {
      console.log('errorMessage ', errorMessage);
      dispatch(defaultUserList());
    }
  }, [userList]);
  
  const getListData = (params) => {
    if (!userList?.isLoading) {
      let result = {
        keyword: params?.keyword ?? '',
        status: params?.status ?? '',
        role: params?.role ?? '',
        page: params?.page ?? 1,
        limit: params?.perPage ?? 10,
      }
      dispatch(getUserList(result));
    }
  }

  const onReset = () => {
    let resetParams = {
      keyword: null,
      status: {
        value: '',
        label: ''
      },
      role: {
        value: '',
        label: ''
      }
    }
    setCurrentPage('1');
    setFilter({...resetParams, keyword: ''});
    getListData({keyword: null, status: null, role: null, page: 1, perPage: parseInt(perPage)})
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Users'}
        list={[
          {title: 'Users', path: '', active: true},
        ]}
      />

      <div className="w-full h-fit flex flex-col bg-white shadow-lg rounded pb-16 desktop:pb-5">
        <DataTable
          isLoading={userList?.isLoading}
          data={userList?.data?.list}
          title={title}
          perPage={perPage}
          currentPage={currnetPage}
          showInfo={true}
          withNumber={true}
          showAddAction={true}
          addLabel={'Add User +'}
          onAdd={() => navigate('/user/create')}
          withAction={true}
          renderAction={(data) => (
            <div className="flex flex-row items-center justify-end gap-2">
              <Tooltip
                className="rounded px-2 py-1 bg-white text-sky-900 border border-sky-900 text-xs font-bold shadow-lg"
                content={"Open Detail"}
                placement="top"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <span
                  className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-sky-600 text-white"
                  onClick={() => navigate(`/user/${data?.id}`)}
                >
                  <i className="fa-solid fa-eye"></i>
                </span>
              </Tooltip>

              {data?.role !== 'admin' ? (
                <>
                  <Tooltip
                  className="rounded px-2 py-1 bg-white text-sky-900 border border-sky-900 text-xs font-bold shadow-lg"
                  content={"Edit"}
                  placement="top"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <span
                    className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-orange-600 text-white"
                    onClick={() => navigate(`/user/edit/${data?.id}`)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </span>
                </Tooltip>

                {parseInt(data?.status) !== 1 ? (
                  <Tooltip
                    className="rounded px-2 py-1 bg-white text-sky-900 border border-sky-900 text-xs font-bold shadow-lg"
                    content={"Inactive"}
                    placement="top"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <span
                      className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-blue-600 text-white"
                      onClick={() => {
                        setSelectData(data)
                        setAlertConfirm({
                          show: true,
                          title: 'Inactive User',
                          message: `Will you set to <b>Inactive</b> for <b>${data?.profile?.name}</b>?`,
                          onCancel: () => {
                            setSelectData({});
                            setAlertConfirm({
                              show: false,
                              title: '',
                              message: '',
                              onCancel: () => {},
                              onConfirm: () => {},
                            });
                          },
                          onConfirm: () => {},
                        })
                      }}
                    >
                      <i className="fa-solid fa-user-xmark"></i>
                    </span>
                  </Tooltip>
                ) : null}
                
                {parseInt(data?.status) !== 2 ? (
                  <Tooltip
                    className="rounded px-2 py-1 bg-white text-sky-900 border border-sky-900 text-xs font-bold shadow-lg"
                    content={"Active"}
                    placement="top"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <span
                      className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-green-600 text-white"
                      onClick={() => {
                        setSelectData(data)
                        setAlertConfirm({
                          show: true,
                          title: 'Active User',
                          message: `Will you set to <b>Active</b> for <b>${data?.profile?.name}</b>?`,
                          onCancel: () => {
                            setSelectData({});
                            setAlertConfirm({
                              show: false,
                              title: '',
                              message: '',
                              onCancel: () => {},
                              onConfirm: () => {},
                            });
                          },
                          onConfirm: () => {},
                        })
                      }}
                    >
                      <i className="fa-solid fa-user-check"></i>
                    </span>
                  </Tooltip>
                ) : null}
                
                {parseInt(data?.status) !== 3 ? (
                  <Tooltip
                    className="rounded px-2 py-1 bg-white text-sky-900 border border-sky-900 text-xs font-bold shadow-lg"
                    content={"Disable"}
                    placement="top"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <span
                      className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-red-600 text-white"
                      onClick={() => {
                        setSelectData(data)
                        setAlertConfirm({
                          show: true,
                          title: 'Disable User',
                          message: `Will you set to <b>Disabled</b> for <b>${data?.profile?.name}</b>?`,
                          onCancel: () => {
                            setSelectData({});
                            setAlertConfirm({
                              show: false,
                              title: '',
                              message: '',
                              onCancel: () => {},
                              onConfirm: () => {},
                            });
                          },
                          onConfirm: () => {},
                        })
                      }}
                    >
                      <i className="fa-solid fa-user-large-slash"></i>
                    </span>
                  </Tooltip>
                  ) : null}

                <Tooltip
                  className="rounded px-2 py-1 bg-white text-sky-900 border border-sky-900 text-xs font-bold shadow-lg"
                  content={"Reset Password"}
                  placement="top"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <span
                    className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-orange-600 text-white"
                    onClick={() => {
                      setSelectData(data)
                        setAlertConfirm({
                          show: true,
                          title: 'Reset Password',
                          message: `Will you reset <b>${data?.profile?.name}</b> password?`,
                          onCancel: () => {
                            setSelectData({});
                            setAlertConfirm({
                              show: false,
                              title: '',
                              message: '',
                              onCancel: () => {},
                              onConfirm: () => {},
                            });
                          },
                          onConfirm: () => {},
                        })
                    }}
                  >
                    <i className="fa-solid fa-key"></i>
                  </span>
                </Tooltip>

                <Tooltip
                  className="rounded px-2 py-1 bg-white text-sky-900 border border-sky-900 text-xs font-bold shadow-lg"
                  content={"Remove"}
                  placement="top"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <span
                    className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-red-600 text-white"
                    onClick={() => {
                      setSelectData(data)
                        setAlertConfirm({
                          show: true,
                          title: 'Remove User',
                          message: `Will you delete <b>${data?.profile?.name}</b> user?`,
                          onCancel: () => {
                            setSelectData({});
                            setAlertConfirm({
                              show: false,
                              title: '',
                              message: '',
                              onCancel: () => {},
                              onConfirm: () => {},
                            });
                          },
                          onConfirm: () => {},
                        })
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </Tooltip>
                </>
              ) : null}
            </div>
          )}
          renderCustomFilter={() => (
            <div className="w-full flex flex-col mb-5">
              <span className="font-bold">Filter</span>
              <div className="w-full flex flex-col tablet:flex-row gap-2">
                <div className="w-full flex flex-col gap-1">
                  <span className="text-xs">Keyword</span>
                  <input
                    type={'text'}
                    className="w-full px-2 rounded h-[30px] text outline-none border border-sky-900 text-xs"
                    placeholder="Search by name, email, username or phone"
                    value={filter?.keyword}
                    onChange={(e) => setFilter({...filter, keyword: e?.currentTarget?.value})}
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-xs">Status</span>
                  <SelectOption
                    isLoading={false}
                    placeholder={'Select Status'}
                    options={[{label: 'Inactive', value: '1'}, {label: 'Active', value: '2'}, {label: 'Disabled', value: '3'}]}
                    objectLabel={'label'}
                    objectUniq={'value'}
                    value={filter?.status}
                    showClear={true}
                    onClear={(data) => setFilter({...filter, status: data})}
                    showSearch={false}
                    onChange={(data) => setFilter({...filter, status: data})}
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-xs">Role</span>
                  <SelectOption
                    isLoading={false}
                    placeholder={'Select Role'}
                    options={[{label: 'Admin', value: 'admin'}, {label: 'Staff', value: 'staff'}]}
                    objectLabel={'label'}
                    objectUniq={'value'}
                    value={filter?.role}
                    showClear={true}
                    onClear={(data) => setFilter({...filter, role: data})}
                    showSearch={false}
                    onChange={(data) => setFilter({...filter, role: data})}
                  />
                </div>
                <div className="w-full tablet:w-fit flex flex-col gap-1">
                  <span className="text-xs hidden tablet:block">&nbsp;</span>
                  <div
                    className="cursor-pointer w-full tablet:w-fit h-full flex items-center justify-center text-white border border-sky-900 bg-sky-900 rounded px-4"
                    onClick={() => {
                      setCurrentPage('1');
                      getListData({
                        keyword: filter?.keyword !== '' ? filter?.keyword : null,
                        status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
                        role: filter?.role?.value??null,
                        page: 1,
                        perPage: parseInt(perPage),
                      })
                    }}>Filter</div>
                </div>
                <div className="w-full tablet:w-fit flex flex-col gap-1" onClick={() => onReset()}>
                  <span className="text-xs hidden tablet:block">&nbsp;</span>
                  <div className="cursor-pointer w-full tablet:w-fit h-full flex items-center justify-center text-sky-900 border border-sky-900 rounded px-4">Reset</div>
                </div>
              </div>
            </div>
          )}
          onChangePerPage={(data) => {
            setPerPage(data)
            setCurrentPage('1');
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : null,
              status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
              role: filter?.role?.value??null,
              page: 1,
              perPage: parseInt(data),
            })
          }}
          onChangePage={(data) => {
            setCurrentPage(data);
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : null,
              status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
              role: filter?.role?.value??null,
              page: parseInt(data),
              perPage: parseInt(perPage),
            })
          }}
          onPrevPage={(data) => {
            setCurrentPage(data);
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : null,
              status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
              role: filter?.role?.value??null,
              page: parseInt(data),
              perPage: parseInt(perPage),
            })
          }}
          onNextPage={(data) => {
            setCurrentPage(data);
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : null,
              status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
              role: filter?.role?.value??null,
              page: parseInt(data),
              perPage: parseInt(perPage),
            })
          }}
        />
      </div>

      <Alert
        show={alertConfirm?.show}
        type="question"
        isLoading={false}
        title={alertConfirm?.title}
        message={alertConfirm?.message}
        showCancelButton={true}
        onCancel={() => alertConfirm?.onCancel ? alertConfirm.onCancel() : {}}
        onConfirm={() => alertConfirm?.onConfirm ? alertConfirm.onConfirm() : {}}
      />
    </div>
  )
}

export default User;