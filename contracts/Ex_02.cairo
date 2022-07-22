%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.uint256 import Uint256
from openzeppelin.token.erc721.library import ERC721
from starkware.starknet.common.syscalls import get_caller_address
struct Token_Attribute:
    member legs : felt
    member sex : felt
    member wings : felt
end

@storage_var
func evaluator_address() -> (evaluator_address : felt):
end

@storage_var
func token_to_characterstics(token_id : Uint256) -> (res : Token_Attribute):
end

@contract_interface
namespace Evaluator:
    func assigned_legs_number(player_address : felt) -> (legs : felt):
    end
    func assigned_sex_number(player_address : felt) -> (sex : felt):
    end
    func assigned_wings_number(player_address : felt) -> (wings : felt):
    end
end

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    name : felt, symbol : felt, to_ : felt
):
    ERC721.initializer(name, symbol)
    let to = to_
    evaluator_address.write(to_)
    let token_id : Uint256 = Uint256(1, 0)
    ERC721._mint(to, token_id)
    let (sender_address) = get_caller_address()
    let (legs_from_evaluator : felt) = Evaluator.assigned_legs_number(
        contract_address=to_, player_address=sender_address
    )
    let (sex_from_evaluator : felt) = Evaluator.assigned_sex_number(
        contract_address=to_, player_address=sender_address
    )
    let (wings_from_evaluator : felt) = Evaluator.assigned_wings_number(
        contract_address=to_, player_address=sender_address
    )

    let token_one_attribute : Token_Attribute = Token_Attribute(
        legs=legs_from_evaluator, sex=sex_from_evaluator, wings=wings_from_evaluator
    )
    token_to_characterstics.write(token_id, token_one_attribute)
    return ()
end

@view
func get_animal_characteristics{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    token_id : Uint256
) -> (sex : felt, legs : felt, wings : felt):
    let (characterstics : Token_Attribute) = token_to_characterstics.read(token_id)
    return (sex=characterstics.sex, legs=characterstics.legs, wings=characterstics.wings)
end

@view
func name{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (name : felt):
    let (name) = ERC721.name()
    return (name)
end

@view
func symbol{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (symbol : felt):
    let (symbol) = ERC721.symbol()
    return (symbol)
end

@view
func balanceOf{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(owner : felt) -> (
    balance : Uint256
):
    let (balance : Uint256) = ERC721.balance_of(owner)
    return (balance)
end

@view
func ownerOf{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    token_id : Uint256
) -> (owner : felt):
    let (owner : felt) = ERC721.owner_of(token_id)
    return (owner)
end

@view
func getApproved{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    token_id : Uint256
) -> (approved : felt):
    let (approved : felt) = ERC721.get_approved(token_id)
    return (approved)
end

@view
func isApprovedForAll{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    owner : felt, operator : felt
) -> (is_approved : felt):
    let (is_approved : felt) = ERC721.is_approved_for_all(owner, operator)
    return (is_approved)
end

#
# Externals
#

@external
func approve{pedersen_ptr : HashBuiltin*, syscall_ptr : felt*, range_check_ptr}(
    to : felt, token_id : Uint256
):
    ERC721.approve(to, token_id)
    return ()
end

@external
func setApprovalForAll{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    operator : felt, approved : felt
):
    ERC721.set_approval_for_all(operator, approved)
    return ()
end

@external
func transferFrom{pedersen_ptr : HashBuiltin*, syscall_ptr : felt*, range_check_ptr}(
    _from : felt, to : felt, token_id : Uint256
):
    ERC721.transfer_from(_from, to, token_id)
    return ()
end

@external
func safeTransferFrom{pedersen_ptr : HashBuiltin*, syscall_ptr : felt*, range_check_ptr}(
    _from : felt, to : felt, token_id : Uint256, data_len : felt, data : felt*
):
    ERC721.safe_transfer_from(_from, to, token_id, data_len, data)
    return ()
end
